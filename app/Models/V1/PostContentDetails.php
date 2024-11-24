<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostContentDetails extends Model
{
    use HasFactory;

    protected $table = 'post_content_details';

    protected $fillable = [
        'id',
        'post_id',
        'value'
    ];

    protected $casts = [
        'value' => 'json'
    ];

    public function postContent()
    {
        return $this->belongsTo(PostContents::class, 'post_id');
    }
}
