<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    public function index(Request $request, string $slug)
    {
        $product = Product::query()->where('slug', $slug)->firstOrFail();

        $pageSize = (int) $request->integer('pageSize', 10);
        $pageSize = max(1, min(50, $pageSize));
        $sort = $request->string('sort', 'created_desc')->toString();

        $query = Review::query()
            ->where('product_id', $product->id)
            ->whereNotNull('published_at');

        match ($sort) {
            'created_asc' => $query->orderBy('created_at', 'asc'),
            'rating_desc' => $query->orderBy('rating', 'desc'),
            'rating_asc' => $query->orderBy('rating', 'asc'),
            default => $query->latest(),
        };

        $paginator = $query->paginate($pageSize);

        return response()->json([
            'data' => $paginator->getCollection()->map(function ($review) {
                return [
                    'id' => $review->id,
                    'product_id' => $review->product_id,
                    'rating' => $review->rating,
                    'author_name' => $review->author_name,
                    'content' => $review->content,
                    'created_at' => $review->created_at?->toIso8601String(),
                ];
            }),
            'meta' => [
                'pagination' => [
                    'page' => $paginator->currentPage(),
                    'pageSize' => $paginator->perPage(),
                    'pageCount' => $paginator->lastPage(),
                    'total' => $paginator->total(),
                ],
            ],
        ]);
    }

    public function store(Request $request, string $slug)
    {
        $product = Product::query()->where('slug', $slug)->firstOrFail();

        $data = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'author_name' => ['required', 'string', 'max:50'],
            'content' => ['required', 'string', 'max:500'],
        ]);

        $review = null;

        DB::transaction(function () use (&$review, $product, $data) {
            $review = Review::create([
                'product_id' => $product->id,
                'rating' => $data['rating'],
                'author_name' => $data['author_name'],
                'content' => $data['content'],
                'published_at' => now(),
            ]);

            // recompute aggregates
            $stats = Review::query()
                ->where('product_id', $product->id)
                ->whereNotNull('published_at')
                ->selectRaw('COUNT(*) as cnt, AVG(rating) as avg_rating')
                ->first();

            $product->update([
                'rating_avg' => round((float) $stats->avg_rating, 2),
                'rating_count' => (int) $stats->cnt,
            ]);
        });

        return response()->json([
            'data' => [
                'id' => $review->id,
                'product_id' => $review->product_id,
                'rating' => $review->rating,
                'author_name' => $review->author_name,
                'content' => $review->content,
                'created_at' => $review->created_at?->toIso8601String(),
            ],
        ], 201);
    }
}

