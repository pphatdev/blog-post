<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Helpers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:helper {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new helper class';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $basePath = basename(config('stubs.helpers.path'));

        $name = explode('/', $this->argument('name'));

        $folderName = implode('/', array_slice($name, 0, -1));

        $className = $name[count($name) - 1];

        $namespace = "App\\{$basePath}\\{$folderName}";

        // Create the directory if it doesn't exist
        $directoryPath = config('stubs.helpers.path') . "/{$folderName}";
        if (!is_dir($directoryPath)) {
            mkdir($directoryPath, 0755, true);
        }

        $stubPath = config('stubs.stubs.path', app_path('Stubs'));
        $stubFile = "{$stubPath}/Helpers.stub";

        // Check if the stubs directory exists
        if (!is_dir($stubPath)) {
            $this->error("Stubs directory not found.");
            $this->line("📂 Directory Path: <fg=yellow>{$stubPath}</>");
            return 1;
        }

        // Check if the stub file exists
        if (!file_exists($stubFile)) {
            $this->error("Stub file not found.");
            $this->line("📂 File Path: <fg=yellow>{$stubFile}</>");
            return 1;
        }

        $newFilePath = "{$directoryPath}/{$className}.php";

        // Check if the file already exists
        if (file_exists($newFilePath)) {
            $this->error("File already exists.");
            $this->line("📂 File Path: <fg=yellow>{$newFilePath}</>");
            return 1;
        }

        $template = file_get_contents($stubFile);

        $template = str_replace('{namespace}', $namespace, $template);
        $template = str_replace('{name}', $className, $template);

        file_put_contents($newFilePath, $template);

        // Beautiful success message
        $this->info("🎉 Helper class created successfully!");
        $this->line("📂 File Path: <fg=green>{$newFilePath}</>");
        $this->line("📦 Namespace: <fg=cyan>{$namespace}</>");
        $this->line("📝 Class Name: <fg=yellow>{$className}</>");
    }
}
