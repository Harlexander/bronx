<?php

namespace App\Http\Middleware;

use App\Models\Product;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

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
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'cart' => [
                'items' => $items,
                'total' => number_format($total, 2),
                'item_count' => $itemCount,
            ],
        ];
    }
}
