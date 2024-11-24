<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostContents extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        "id",
        "title",
        "slug",
        "excerpt",
        "order",
        "depth",
        "type",
        "created_at",
        "updated_at",
    ];

    public function details()
    {
        return $this->hasMany(PostContentDetails::class, 'post_content_id');
    }
}
