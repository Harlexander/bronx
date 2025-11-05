<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Order;
use App\Models\Transaction;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Stripe\StripeClient;

class CheckoutController extends Controller
{
    public function createOrder(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|in:espees,stripe,kingspay',
            'delivery_address' => 'required|string',
        ]);

        $cart = session()->get('cart', []);
        if (empty($cart)) {
            return back()->with('error', 'Your cart is empty');
        }

        // Calculate total
        $total = 0;
        foreach ($cart as $item) {
            $product = Product::find($item['product_id']);
            if ($product) {
                $total += $product->price * $item['quantity'];
            }
        }

        // Create order (user_id can be null for guest checkout)
        $order = Order::create([
            'user_id' => Auth::id(),
            'order_number' => 'ORD-' . strtoupper(Str::random(10)),
            'subtotal' => $total,
            'total' => $total,
            'status' => 'pending',
            'payment_status' => 'pending',
            'delivery_address' => $request->delivery_address,
        ]);

        // Create order items
        foreach ($cart as $item) {
            $product = Product::find($item['product_id']);
            if ($product) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'total' => $product->price * $item['quantity'],
                ]);
            }
        } 

        // Create transaction (user_id can be null for guest checkout)
        $transaction = Transaction::create([
            'order_id' => $order->id,
            'user_id' => Auth::id(),
            'transaction_id' => 'TXN-' . strtoupper(Str::random(10)),
            'amount' => $total,
            'status' => 'pending',
            'payment_method' => $request->payment_method,
        ]);

        error_log($request->payment_method);
        // Process payment based on method
        switch ($request->payment_method) {
            case 'espees':
                return $this->processEspeesPayment($transaction);
            case 'kingspay':
                return $this->processKingspayPayment($transaction, 'NGN');
            default:
                return $this->processEspeesPayment($transaction);
        }
    }

    private function processEspeesPayment(Transaction $transaction)
    {
        $app_url = env('APP_URL');
        $return_url = "$app_url/checkout/confirm/{$transaction->transaction_id}";

        // Get email from authenticated user or use guest email from request
        $email = Auth::check() ? Auth::user()->email : (request()->input('email') ?? 'guest@example.com');

        $response = Http::withHeaders([
            'X-Api-Key' => env('ESPEES_API_KEY'),
        ])->post('https://api.espees.org/v2/payment/product', [
            'product_sku' => $transaction->transaction_id,
            'narration' => 'Order payment for CLM Store',
            'price' => 0.001,
            'merchant_wallet' => env('ESPEES_MERCHANT_WALLET'),
            'success_url' => $return_url,
            'fail_url' => "$app_url/checkout",
            'user_data' => [
                'id' => $transaction->user_id ?? 'guest',
                'email' => $email
            ],
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $transaction->update([
                'payment_reference' => $data['payment_ref'],
            ]);

            return response()->json([
                'success' => true,
                'payment_url' => "https://payment.espees.org/pay/{$data['payment_ref']}"
            ]);
        }

        error_log($response->body());

        return response()->json([
            'success' => false,
            'error' => 'Failed to initialize payment'
        ]);
    }

    private function processKingspayPayment(Transaction $transaction, $payment_currency)
    {
        $app_url = env('APP_URL');
        $return_url = "$app_url/checkout/confirm/{$transaction->transaction_id}";
        $webhook_url = "$app_url/checkout/webhook";

        $amount = $payment_currency === 'usd' ? $transaction->amount : ($transaction->amount * env('KINGSPAY_NGN_RATE'));

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('KINGSPAY_SECRET_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.kingspay-gs.com/api/payment/initialize', [
            'amount' => $amount * 100, // Convert to cents
            'currency' => strtoupper($payment_currency),
            'description' => 'CLM Store Order Payment',
            'merchant_callback_url' => $return_url,
            'merchant_webhook_url' => $webhook_url,
            'metadata' => [
                'order_id' => $transaction->order_id,
                'user_id' => $transaction->user_id,
                'transaction_id' => $transaction->transaction_id
            ],
            'payment_type' => 'african',
            'email' => Auth::check() ? Auth::user()->email : (request()->input('email') ?? 'guest@example.com')
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $transaction->update([
                'payment_reference' => $data['payment_id'],
                'payment_details' => $data,
            ]);

            return response()->json([
                'success' => true,
                'payment_url' => "https://kingspay-gs.com/payment?id={$data['payment_id']}"
            ]);
        }

        return response()->json([
            'success' => false,
            'error' => 'Failed to initialize payment'
        ]);
    }

    public function confirmPayment(Request $request, $transactionId)
    {
        $transaction = Transaction::where('transaction_id', $transactionId)->firstOrFail();

        switch ($transaction->payment_method) {
            case 'espees':
                $response = Http::withHeaders([
                    'X-Api-Key' => env('ESPEES_API_KEY'),
                ])->post('https://api.espees.org/v2/payment/confirm', [
                    'payment_ref' => $transaction->payment_reference,
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    if ($data['transaction_status'] === 'APPROVED') {
                        $this->completeTransaction($transaction);
                        return redirect()->route('checkout.success', ['order_id' => $transaction->order_id])
                            ->with('success', 'Payment completed successfully!');
                    }
                }
                break;

            case 'kingspay':
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . env('KINGSPAY_SECRET_KEY'),
                ])->get("https://api.kingspay-gs.com/api/payment/{$transaction->payment_reference}");

                if ($response->successful()) {
                    $data = $response->json();
                    if ($data['status'] === 'SUCCESS') {
                        $this->completeTransaction($transaction);
                        return redirect()->route('checkout.success', ['order_id' => $transaction->order_id])
                            ->with('success', 'Payment completed successfully!');
                    }
                }
                break;

            default:
                // For Stripe, we'll handle it via webhook
                return redirect()->route('checkout.success', ['order_id' => $transaction->order_id])
                    ->with('success', 'Payment is being processed...');
        }

        return redirect()->route('checkout.failed', $transaction->order_id)
            ->with('error', 'Payment verification failed');
    }

    private function completeTransaction(Transaction $transaction)
    {
        $transaction->update([
            'status' => 'completed',
            'paid_at' => now(),
        ]);

        $order = $transaction->order;
        $order->update([
            'status' => 'processing',
            'payment_status' => 'paid',
        ]);

        // Clear cart
        session()->forget('cart');
    }
}
