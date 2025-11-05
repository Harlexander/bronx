<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard');
    }

    public function orders()
    {
        $orders = Order::with('items.product:id,name,price,image')->latest()->get();
        return Inertia::render('dashboard/orders', [
            'orders' => $orders,
        ]);
    }
    
    public function security()
    {
        return Inertia::render('dashboard/security');
    }
}
