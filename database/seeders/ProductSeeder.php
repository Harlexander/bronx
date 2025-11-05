<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Bronxx Core Battery',
                'description' => 'High‑density lithium‑polymer cell tuned for stable output and long cycle life.',
                'price' => 49.00,
                'sale_price' => null,
                'stock_quantity' => 100,
                'image' => '/products/1.jpg',
                'category' => 'Power',
                'is_featured' => true,
                'is_active' => true,
                'status' => 'published',
            ],
            [
                'name' => 'Bronxx Fast Charger',
                'description' => 'USB‑C fast charger with smart thermal management and charge protection.',
                'price' => 29.00,
                'sale_price' => null,
                'stock_quantity' => 150,
                'image' => '/products/2.jpg',
                'category' => 'Charging',
                'is_featured' => true,
                'is_active' => true,
                'status' => 'published',
            ],
            [
                'name' => 'Battery Module Pro',
                'description' => 'Pro‑grade module for extended runtime and consistent performance under load.',
                'price' => 79.00,
                'sale_price' => 69.00,
                'stock_quantity' => 60,
                'image' => '/products/1.jpg',
                'category' => 'Power',
                'is_featured' => false,
                'is_active' => true,
                'status' => 'published',
            ],
            [
                'name' => 'Thermal Shield Kit',
                'description' => 'Lightweight layer that improves heat dissipation and protects internal cells.',
                'price' => 19.00,
                'sale_price' => null,
                'stock_quantity' => 200,
                'image' => '/products/2.jpg',
                'category' => 'Accessories',
                'is_featured' => false,
                'is_active' => true,
                'status' => 'published',
            ],
        ];

        foreach ($products as $data) {
            $data['slug'] = Str::slug($data['name']);
            Product::updateOrCreate(['slug' => $data['slug']], $data);
        }
    }
}


