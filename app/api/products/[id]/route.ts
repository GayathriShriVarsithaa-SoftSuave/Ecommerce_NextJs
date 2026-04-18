import {NextResponse} from "next/server";
export async function PATCH(req:Request,{params}:{params:{id:string}}){
    try{
        const body=await req.json();
        const res=await fetch(`https://dummyjson.com/products/${params.id}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(body)
        })
        const data=await res.json();
        return NextResponse.json(data);
    }
    catch(err){
        return NextResponse.json({ message:"Error"});
    }

}
export async function DELETE(req:Request,{ params }:{params: { id: string }}){
    try{
        const res=await fetch(`https://dummyjson.com/products/${params.id}`,{
            method:'DELETE'
        })
        const data=await res.json();
        return NextResponse.json(data);
    }
    catch(err){
        return NextResponse.json({ message:"Error"});
    }

}
export async function GET(req:Request,{params}:{params:{id:string}}){
    try{
        const res=await fetch(`https://dummyjson.com/products/${params.id}`)
        const data=await res.json();
        return NextResponse.json(data);
    }
    catch(err){
        return NextResponse.json({ message:"Error"});
    }
}