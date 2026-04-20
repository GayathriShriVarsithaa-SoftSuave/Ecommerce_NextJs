import { NextResponse } from "next/server";
export async function GET(req:Request){
    const {searchParams}=new URL(req.url);
    const searchtxt=searchParams.get("q");
      try{
        if(searchtxt){
            const res=await fetch(`https://dummyjson.com/products/search?q=${searchtxt}`);
            const data=await res.json();
            return NextResponse.json(data.products);
        }
            const res = await fetch('https://dummyjson.com/products');
            const data = await res.json();
            return NextResponse.json(data.products);
        } 
        catch(err){
            return NextResponse.json({ message:"Error"});
        }
}

export async function POST(req:Request){
    try{
       const body=await req.json();
       const res=await fetch('https://dummyjson.com/products/add',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(body)
       });
       const data=await res.json();
       return NextResponse.json(data);
    }
    catch(err){
        return NextResponse.json({message:"Error"});
    }
}