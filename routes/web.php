<?php

use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard.index');
    Route::get('orders', [App\Http\Controllers\DashboardController::class, 'orders'])->name('dashboard.orders');
    Route::get('security', [App\Http\Controllers\DashboardController::class, 'security'])->name('dashboard.security');
});

require __DIR__.'/settings.php';

// About page
Route::get('about', function () {
    return Inertia::render('about');
})->name('about');

// Contact page
Route::get('contact', function () {
    return Inertia::render('contact');
})->name('contact');

// Products page
Route::get('product', function () {
    $products = Product::where('is_active', true)->get();
    return Inertia::render('products', [
        'products' => $products,
    ]);
})->name('product');

// Cart routes
Route::prefix('cart')->group(function () {
    Route::get('/', [App\Http\Controllers\CartController::class, 'index'])->name('cart.index');
    Route::get('get', [App\Http\Controllers\CartController::class, 'get'])->name('cart.get');
    Route::post('add', [App\Http\Controllers\CartController::class, 'add'])->name('cart.add');
    Route::put('update/{itemId}', [App\Http\Controllers\CartController::class, 'update'])->name('cart.update');
    Route::delete('remove/{itemId}', [App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove');
    Route::delete('clear', [App\Http\Controllers\CartController::class, 'clear'])->name('cart.clear');
});

// Checkout page
Route::get('checkout', function () {
    return Inertia::render('checkout');
})->name('checkout');

// Checkout success page
Route::get('checkout/success', function () {
    return Inertia::render('checkout/success');
})->name('checkout.success');

// Checkout routes
Route::post('checkout/create-order', [App\Http\Controllers\CheckoutController::class, 'createOrder'])->name('checkout.create-order');
Route::get('checkout/confirm/{transactionId}', [App\Http\Controllers\CheckoutController::class, 'confirmPayment'])->name('checkout.confirm');
