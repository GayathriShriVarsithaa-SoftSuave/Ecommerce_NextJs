export const getproducts=async()=>{
     const res = await fetch('https://dummyjson.com/products');
     if(!res.ok){
        throw new Error("Something went wrong!");
     }
     return res;
}
export const searchproducts=async(searchtxt:string)=>{
        const res=await fetch(`https://dummyjson.com/products/search?q=${searchtxt}`);
        if(!res.ok){
        throw new Error("Something went wrong!");
        }
        return res;
}
export const delproduct=async(id:string)=>{
        const res=await fetch((`/api/products/${id}`),{
            method:'DELETE'
            })
        if(!res.ok){
        throw new Error("Something went wrong!");
        }
        return res;
}
export const updateproduct=async(id:string,title1:string,category1:string,price1:number,actualprice1:number,rating1:number,des1:string,brand1:string,weight1:number,minorder1:number)=>{
    const res=await fetch(`/api/products/${id}`,{
                method:'PATCH',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({
                    title:title1,
                    category:category1,
                    price:price1,
                    discountPercentage:actualprice1,
                    rating:rating1,
                    description:des1,
                    brand:brand1,
                    weight:weight1,
                    minimumOrderQuantity:minorder1
                })
            })
            if(!res.ok){
        throw new Error("Something went wrong!");
            }
        return res;

}
export const getsingleproduct=async(id:string)=>{
    const res=await fetch(`/api/products/${id}`);
    if(!res.ok){
        throw new Error("Something went wrong!");
    }
    return res;
}
export const addproduct=async(title:string,category:string,des:string,price:number,rating:number,img:string,brand:string,stock:number)=>{
    const res=await fetch('/api/products',{
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({
                    title:title,
                    category:category,
                    description:des,
                    price:price,
                    rating:rating,
                    thumbnail:img,
                    brand:brand,
                    stock:stock
                })
            })
            if(!res.ok){
        throw new Error("Something went wrong!");
            }
            return res;
}