<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::query()
            ->withCount('products')
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $categories->map(function ($cat) {
                return [
                    'id' => $cat->id,
                    'slug' => $cat->slug,
                    'name' => $cat->name,
                    'description' => $cat->description,
                    'product_count' => (int) $cat->products_count,
                ];
            }),
            'meta' => new \stdClass(),
        ]);
    }
}

