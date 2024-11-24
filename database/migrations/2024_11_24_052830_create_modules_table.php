<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        !Schema::hasTable('modules') && Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('route')->nullable();
            $table->string('icon')->nullable();
            $table->boolean('alive')->default(true);
            $table->boolean('is_new')->default(false);
            $table->string('name')->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('status')->default(true);
            $table->boolean('is_deleted')->default(false);
            $table->integer('create_by')->default(1);
            $table->timestamps();

            $table->foreign('parent_id')
                ->references('id')
                ->on('modules')
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
        Schema::dropIfExists('modules');
    }
}
