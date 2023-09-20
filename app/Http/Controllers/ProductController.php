<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //
    public function store(Request $request){
        $create = Product::create(
            [
                'name' => $request->name,
                'price' => $request->price,
                'stock' => $request->stock,
                'description' => $request->description,
            ]
        );
        if($create){ return redirect('product'); }
        else{return redirect('product');}
    }

    public function update(Request $request, Product $id){
        $update = $id->update(
            [
                'name' => $request->name,
                'price' => $request->price,
                'stock' => $request->stock,
                'description' => $request->description,
            ]
        );
        if($update){ return redirect('product'); }
        else{return redirect('product');}
    }

    public function destroy(Product $id){
        $id->delete();
    }
}
