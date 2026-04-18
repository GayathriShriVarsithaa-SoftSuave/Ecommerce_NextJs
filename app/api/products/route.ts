import { NextResponse } from "next/server";
export async function GET(){
      try{
            const res = await fetch('https://dummyjson.com/products');
            const data = await res.json();
            return NextResponse.json(data.products);
        } 
        catch(err){
            return NextResponse.json({ message: "Error fetching data" },{ status: 500 });
        }
}
export async function POST(){
    
}
export async function PATCH(){

}
export async function DELETE(){

}