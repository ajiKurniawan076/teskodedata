<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Integer;
use App\Models\Transaction;

class TransactionController extends Controller
{
    //
    public function store(Request $request){
        Transaction::create([
            'quantity' => $request->quantity,
            'price' => $request->price,
            'payment_amount' => $request->payment_amount,
            'product_id' => $request->product_id,
            'reference_no' => $request->reference_no
        ]);
    }

    public function storeapi(Request $request){
        try{
        $valid = $request->validate([
            'quantity' => 'required',
            'price' => 'required',
            'payment_amount' => 'required'
        ]);
        $valid['reference_no'] = 'INV'.rand(1000000,9999999);
        }
        catch(\Exception $e){
            return response()->json([
                "message" => "Failed to create transaction",
                "error" => $e->getMessage()
            ], HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'code' => 20000,
            'message' => 'OK',
            'data' => $valid    
        ]);
    

    }
}
