<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostContentDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        !Schema::hasTable('post_content_details') && Schema::create('post_content_details', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('post_id');
            $table->json('value')->default('[]');
            $table->boolean('status')->default(true);
            $table->boolean('is_deleted')->default(false);
            $table->integer('created_by')->nullable();
            $table->timestamps();

            $table->foreign('post_id')
                ->references('id')
                ->on('post_contents')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_content_details');
    }
}
