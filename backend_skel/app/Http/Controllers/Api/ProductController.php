<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = (int) $request->integer('pageSize', 12);
        $pageSize = max(1, min(48, $pageSize));

        $query = Product::query()->with(['category'])->withCount('reviews');

        // Filters
        if ($search = $request->string('search')->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description_html', 'like', "%{$search}%");
            });
        }

        if ($categorySlug = $request->string('category')->toString()) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
        }

        $mapRange = function (string $field, string $minKey, string $maxKey) use ($request, $query) {
            $min = $request->input($minKey);
            $max = $request->input($maxKey);
            if ($min !== null && is_numeric($min)) {
                $query->where($field, '>=', $min);
            }
            if ($max !== null && is_numeric($max)) {
                $query->where($field, '<=', $max);
            }
        };

        $mapRange('price', 'min_price', 'max_price');
        $mapRange('power_watt', 'min_power', 'max_power');
        $mapRange('battery_hours', 'min_battery', 'max_battery');

        // Sorting
        $sort = $request->string('sort', 'newest')->toString();
        match ($sort) {
            'price_asc' => $query->orderBy('price', 'asc'),
            'price_desc' => $query->orderBy('price', 'desc'),
            'power_asc' => $query->orderBy('power_watt', 'asc'),
            'power_desc' => $query->orderBy('power_watt', 'desc'),
            default => $query->orderBy('created_at', 'desc'),
        };

        $paginator = $query->paginate($pageSize);

        $data = $paginator->items();

        return response()->json([
            'data' => array_map(fn ($product) => $this->transformProduct($product), $data),
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

    public function show(string $slug)
    {
        $product = Product::query()
            ->where('slug', $slug)
            ->with(['category', 'reviews' => function ($q) {
                $q->whereNotNull('published_at')->latest()->limit(3);
            }])
            ->withCount('reviews')
            ->first();

        if (! $product) {
            return response()->json([
                'error' => [
                    'status' => 404,
                    'message' => 'Product not found',
                    'code' => 'PRODUCT_NOT_FOUND',
                ],
            ], 404);
        }

        $result = $this->transformProduct($product);
        $result['top_reviews'] = $product->reviews->map(function ($review) {
            return [
                'id' => $review->id,
                'product_id' => $review->product_id,
                'rating' => $review->rating,
                'author_name' => $review->author_name,
                'content' => $review->content,
                'created_at' => $review->created_at?->toIso8601String(),
            ];
        })->all();

        return response()->json(['data' => $result]);
    }

    protected function transformProduct(Product $product): array
    {
        return [
            'id' => $product->id,
            'slug' => $product->slug,
            'title' => $product->title,
            'descriptionHtml' => $product->description_html,
            'price' => (int) $product->price,
            'compare_price' => $product->compare_price ? (int) $product->compare_price : null,
            'power_watt' => $product->power_watt,
            'battery_hours' => $product->battery_hours,
            'dimensions' => $product->dimensions,
            'weight' => $product->weight !== null ? (float) $product->weight : null,
            'connectivity' => $product->connectivity,
            'is_customizable' => (bool) $product->is_customizable,
            'rating_avg' => (float) $product->rating_avg,
            'rating_count' => (int) $product->rating_count,
            'category' => $product->category ? [
                'id' => $product->category->id,
                'slug' => $product->category->slug,
                'name' => $product->category->name,
            ] : null,
            // images: to be filled once a media solution is chosen
            'images' => [],
            'created_at' => $product->created_at?->toIso8601String(),
            'updated_at' => $product->updated_at?->toIso8601String(),
        ];
    }
}

