<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Introduction
Welcome to the `Laravel React Blog Post` project! This is a simple blog application built with Laravel and React.js. It allows users to create, edit, and delete blog posts.

## Getting Started

1. Install dependencies:

```bash
composer install && npm install
```
2. Create a `.env` file based on `.env.example` and configure your database settings.

3. Generate an application key:

```bash
php artisan key:generate
```
4. Run database migrations:

```bash
php artisan migrate
```
5. Start the development server:

```bash
php artisan serve
```

```bash
npm run watch
```

## With Quickly Start

### Clone Project
To clone project from GitHub:
```bash
git clone https://github.com/pphatdev/blog-post.git && cd blog-post
```

### Setup Project Environment
```bash
composer install && npm install && cp .env.example .env && php artisan key:generate && npm run dev && php artisan serve
```

## Usage
- Visit `http://localhost:8000` in your browser to access the application.

## Contributing

- Contributions are welcome! Please create a pull request or open an issue for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Laravel - The PHP framework used for the backend.
- React - The JavaScript library used for the frontend.
- Tailwind CSS - A utility-first CSS framework for styling.