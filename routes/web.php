<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $visitorCount = cache()->get('total_visitors', 1);
    
    return view('landing', compact('visitorCount'));
});

// Increment visitor count (call this on each visit)
Route::get('/track-visit', function () {
    $count = cache()->get('total_visitors', 0);
    cache()->put('total_visitors', $count + 1, now()->addYear());
    
    return response()->json(['count' => $count + 1]);
});

// API to get current count
Route::get('/api/visitor-count', function () {
    return response()->json([
        'count' => cache()->get('total_visitors', 0)
    ]);
});