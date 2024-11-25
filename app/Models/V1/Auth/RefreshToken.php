<?php

namespace App\Models\V1\Auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefreshToken extends Model
{
    use HasFactory;
    protected $table = 'oauth_refresh_tokens';

    protected $fillable = [
        'id',
        'access_token_id',
        'revoked',
        'expires_at'
    ];

    protected $casts = [
        'revoked' => 'boolean',
        'expires_at' => 'datetime'
    ];

    public $timestamps = false;
}
