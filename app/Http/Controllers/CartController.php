<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    private function getCartData()
    {
        $cart = session()->get('cart', []);
        $items = [];
        $total = 0;
        $itemCount = 0;

        foreach ($cart as $item) {
            $product = Product::find($item['product_id']);
            if ($product) {
                $items[] = [
                    'id' => $item['id'],
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => (string) number_format($product->price, 2),
                    'product' => [
                        'id' => $product->id,
                        'name' => $product->name,
                        'price' => (string) number_format($product->price, 2),
                        'image' => $product->image ?? '/products/1.jpg',
                        'subtitle' => $product->category,
                        'description' => $product->description,
                    ],
                ];
                $total += $product->price * $item['quantity'];
                $itemCount += $item['quantity'];
            }
        }

        return [
            'items' => $items,
            'total' => number_format($total, 2),
            'item_count' => $itemCount,
        ];
    }

    public function index()
    {
        $cartData = $this->getCartData();

        return Inertia::render('cart/index', [
            'cart' => $cartData,
        ]);
    }

    public function get()
    {
        return response()->json($this->getCartData());
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = session()->get('cart', []);
        $product = Product::find($validated['product_id']);

        // Check if product is already in cart
        $existingItem = collect($cart)->firstWhere('product_id', $validated['product_id']);

        if ($existingItem) {
            // Update quantity if product exists
            $cart = collect($cart)->map(function ($item) use ($validated) {
                if ($item['product_id'] === $validated['product_id']) {
                    $item['quantity'] += $validated['quantity'];
                }
                return $item;
            })->toArray();
        } else {
            // Add new item to cart
            $cart[] = [
                'id' => uniqid(),
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
            ];
        }

        session()->put('cart', $cart);

        return back()->with('success', 'Product added to cart');
    }

    public function update(Request $request, $itemId)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = session()->get('cart', []);
        $cart = collect($cart)->map(function ($item) use ($itemId, $validated) {
            if ($item['id'] === $itemId) {
                $item['quantity'] = $validated['quantity'];
            }
            return $item;
        })->toArray();

        session()->put('cart', $cart);    

        return back()->with('success', 'Cart updated');
    }

    public function remove($itemId)
    {
        $cart = session()->get('cart', []);
        $cart = collect($cart)->reject(function ($item) use ($itemId) {
            return $item['id'] === $itemId;
        })->values()->toArray();

        session()->put('cart', $cart);

        return back()->with('success', 'Product removed from cart');
    }

    public function clear()
    {
        session()->forget('cart');

        return back()->with('success', 'Cart cleared');
    }
} 