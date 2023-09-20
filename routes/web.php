<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/product', function () {
$product = Product::paginate(5);
    return Inertia::render('Product', [
        'product' => $product
    ]);
})->middleware(['auth', 'verified'])->name('product');

Route::get('/transaction', function () {
    $product = Product::all();
    $transaction = Transaction::paginate(5);
    return Inertia::render('Transaction',[
        'product' => $product,
        'transaction' => $transaction
    ]);
})->middleware(['auth', 'verified'])->name('transaction');

Route::post('/product', [ProductController::class, 'store']);

Route::put('/product/{id}', [ProductController::class, 'update']);

Route::delete('/product/{id}', [ProductController::class, 'destroy']);

Route::post('/transaction', [TransactionController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
