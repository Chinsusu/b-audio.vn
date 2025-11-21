<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Support\Facades\Route;

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('{slug}', [ProductController::class, 'show']);

    Route::get('{slug}/reviews', [ReviewController::class, 'index']);
    Route::post('{slug}/reviews', [ReviewController::class, 'store']);
});

Route::get('categories', [CategoryController::class, 'index']);

