<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'description_html',
        'price',
        'compare_price',
        'power_watt',
        'battery_hours',
        'dimensions',
        'weight',
        'connectivity',
        'is_customizable',
        'rating_avg',
        'rating_count',
        'category_id',
    ];

    protected $casts = [
        'is_customizable' => 'bool',
        'price' => 'int',
        'compare_price' => 'int',
        'power_watt' => 'int',
        'battery_hours' => 'int',
        'weight' => 'float',
        'rating_avg' => 'float',
        'rating_count' => 'int',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}

