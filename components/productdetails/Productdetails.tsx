"use client"
import style from './Productdetails.module.css'
import { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useRouter} from 'next/navigation'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {Dialog} from '@mui/material';
import {DialogActions} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogContentText} from '@mui/material';
import {DialogTitle} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import Link from 'next/link';
import { addcartItem } from '@/redux/features/cartSlice';
import { Drawer } from '@mui/joy';
import type { RootState } from '../../redux/store';
import Item from '../item/Item'
interface Dimension{
    width:number,
    height:number,
    depth:number
}
interface Review{
    rating:number,
    comment:string,
    date:string,
    reviewerName:string,
    reviewerEmail:string
}
interface Meta{
    createdAt:string,
    updatedAt:string,
    barcode:string,
    qrCode:string
}
interface ProductData{
    title:string,
    price:number,
    discountPercentage:number,
    rating:number,
    stock:number,
    tags:string[],
    brand:string,
    weight:number,
    dimensions:Dimension,
    warrantyInformation:string,
    shippingInformation:string,
    availabilityStatus:string,
    reviews:Review[],
    returnPolicy:string,
    minimumOrderQuantity:number,
    meta:Meta,
    description:string,
    category:string,
    images:string[]
}

export default function Productdetails({id}:{id:string}){
    const [diaopen,setDiaOpen]=useState(false);
    const [data,setData]=useState<ProductData>();
    const [title,setTitle]=useState("");
    const [category,setCategory]=useState("");
    const [price,setPrice]=useState(0);
    const [actualprice,setActualPrice]=useState(0);
    const [rating,setRating]=useState(0);
    const [des,setDes]=useState("");
    const [brand,setBrand]=useState("");
    const [weight,setWeight]=useState(0);
    const [minorder,setMinOrder]=useState(0);
    const router=useRouter();
    const dispatch=useDispatch();
    const [opencart,setOpenCart]=useState(false);
    const { cartitems } = useSelector((state: RootState) => state.cartitem);
    const addtask=()=>{
        dispatch(addcartItem({id,item:{title,price,img:data?.images[0] || ''}}))
        setOpenCart(true);
    }
    const updateitem=async()=>{
        try{
            const res=await fetch(`/api/products/${id}`,{
                method:'PATCH',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({
                    title:title,
                    category:category,
                    price:price,
                    discountPercentage:actualprice,
                    rating:rating,
                    description:des,
                    brand:brand,
                    weight:weight,
                    minimumOrderQuantity:minorder
                })
            })
            if(!res.ok){
                alert("Something went wrong!");
                return;
            }
            setDiaOpen(false); 
            alert("Updated");
        }
        catch(err){
            alert(err);
        }
    }
    const delprod=async()=>{
        try{
            const res=await fetch((`/api/products/${id}`),{
            method:'DELETE'
            })
            if(!res.ok){
                alert("something went wrong!");
                return;
            }
            alert("Product Deleted!");
            router.push("/");
        }
        catch(err){      
            alert(err);
        }
    }

    const fetchdata=async()=>{
        try{
            const res=await fetch(`https://dummyjson.com/products/${id}`)
            if(!res.ok){
                alert("something went wrong!");
                return;
            }
            const data=await res.json();
            setData(data);
            setTitle(data.title);
            setCategory(data.category);
            setPrice(data.price);
            setActualPrice(data.discountPercentage);
            setDes(data.description);
            setRating(data.rating);
            setBrand(data.brand);
            setWeight(data.weight);
            setMinOrder(data.minimumOrderQuantity)
        }
        catch(err){
            alert(err);
        }
    }
    useEffect(()=>{
         if (!id) return;  
        fetchdata();
    },[id])
    return(
        <div className={style.prod}>
            <div className={style.prodhead}>
                <Link href={"/"}> <ArrowBackIcon className={style.backicon}/></Link>
                
                <Button onClick={()=>addtask()} className={style.addcart} sx={{backgroundColor:'#02e7d0',borderradius:'30px',color:'white', '&:hover':{backgroundColor:'#26a69a',}, '&:active':{backgroundColor:'#0ef0da'}}}>Add to Cart</Button>
            </div>
            <p className={style.heading}>{title}</p>
            <p className={style.destxt}>Description:</p>
            <p className={style.prodes}>{des}</p>

            
            <div className={style.prodbody}>
                <div className={style.prodimage}>
                    <img src={data?.images?.[0]} alt='prod img' className={style.prodimages}/>
                    <div className={style.pricebody}>
                        <h3>Price: ${price}</h3>
                        <p>Actual Price: <span style={{textDecoration:"line-through"}}>${actualprice}</span></p>
                    </div>
                </div>

                <div className={style.proddetails}>
                    <p><span className={style.txttitle}>Category : </span>{category}</p>
                    <p><span className={style.txttitle}>Rating : </span>{rating}</p>
                    <p><span className={style.txttitle}>Stock : </span>{data?.stock}</p>
                    <p><span className={style.txttitle}>Brand : </span>{brand}</p>
                    <p><span className={style.txttitle}>Weight : </span>{weight} g</p>
                    <p><span className={style.txttitle}>Waranty :</span> {data?.warrantyInformation}</p>
                    <p><span className={style.txttitle}>Shipping :</span> {data?.shippingInformation}</p>
                    <p><span className={style.txttitle}>Availability :</span> {data?.availabilityStatus}</p>
                    <p><span className={style.txttitle}>Return Policy :</span> {data?.returnPolicy}</p>
                    <p><span className={style.txttitle}>Minimum Order Quantity :</span> {data?.minimumOrderQuantity}</p>
                    
                </div>
                
            </div>
            <p className={style.destxt}>Reviews:</p>
                <div className={style.body2}>
                        {
                            data?.reviews?.map((review)=> 
                            <div className={style.rate} key={review.reviewerEmail}>
                                <p className={style.txttitle}>Rating : {review.rating}</p>
                                <p>Comment : {review.comment}</p>
                                <p>Date : {review.date}</p>
                                <p>ReviewerName : {review.reviewerName}</p>
                                <p>ReviewerMail : {review.reviewerEmail}</p>
                            </div>
                            )
                        }
                        
                    
                </div>

            <div className={style.btns}>
                <Button variant="contained"  className='deletebtn' onClick={delprod}
                sx={{backgroundColor:'red', '&:hover':{backgroundColor:'#ff5252',}, '&:active':{backgroundColor:'#ff1744'} }}>Delete</Button>
                <Button variant="contained"
                sx={{backgroundColor:'#02e7d0', '&:hover':{backgroundColor:'#26a69a',}, '&:active':{backgroundColor:'#0ef0da'}}} className='updatebtn' onClick={()=>{setDiaOpen(true);setTitle(title);setPrice(price);setCategory(category);setDes(des);
                    setActualPrice(actualprice);setBrand(brand);setRating(rating);setWeight(weight);setMinOrder(minorder);
                }}>Update</Button>
            </div>

            <Dialog open={diaopen} onClose={()=>setDiaOpen(false)}>
                <DialogTitle>Edit Product Details</DialogTitle>
                <IconButton onClick={()=>setDiaOpen(false)} sx={{
                    position:"absolute",
                    top:"8px",
                    right:"8px"
                }}>
                    <CloseIcon />
                </IconButton>
                <DialogContentText sx={{textIndent:25}}>Edit the product details below</DialogContentText>
                <DialogContent>
                    <form onSubmit={(e)=>{e.preventDefault(),updateitem()}} id='editform'>
                        <TextField 
                            sx={{ width: '100%' }}
                        variant="standard"
                        value={title}
                        required
                        label='Title'
                        margin="dense"
                        onChange={(e)=>setTitle(e.target.value)}
                        /><br></br>
                        <TextField 
                            sx={{ width: '100%' }}
                            margin="dense"
                            required
                         variant="standard"
                        value={category}
                        label='Category'
                        onChange={(e)=>setCategory(e.target.value)}/><br />
                        <TextField 
                            sx={{ width: '100%' }}
                            margin="dense"
                        variant="standard"
                        required
                        value={price}
                        label='Price'
                        onChange={(e)=>setPrice(Number(e.target.value))}/><br/>
                        <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        required
                        variant="standard"
                        value={actualprice}
                        label='Actual Price'
                        onChange={(e)=>setActualPrice(Number(e.target.value))}
                        />
                        <p>Description</p>
                        <Textarea 
                        value={des}maxRows={5}
                        onChange={(e)=>setDes(e.target.value)}
                        sx={{width:'100%'}}
                        required
                        />
                        <TextField
                        sx={{width:'100%'}}
                        required
                        margin="dense"
                        variant="standard"
                        value={rating}
                        label='Rating'
                        type='Number'
                        onChange={(e)=>setRating(Number(e.target.value))}
                        />
                        <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        variant="standard"
                        required
                        value={brand}
                        label="Brand"
                        onChange={(e)=>setBrand(e.target.value)}
                        />
                        <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        required
                        variant="standard"
                        value={weight}
                        label="Weight"
                        type='Number'
                        onChange={(e)=>setWeight(Number(e.target.value))}
                        />
                         <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        value={minorder}
                        label="Minimum Order"
                        variant="standard"
                        type='Number'
                        required
                        onChange={(e)=>setMinOrder(Number(e.target.value))}
                        />
                    </form>
                </DialogContent>
                <div className={style.buttonsform}>
                    <DialogActions>
                        <Button variant="contained" onClick={()=>setDiaOpen(false)} sx={{backgroundColor:'red', '&:hover':{backgroundColor:'#ff5252',}, '&:active':{backgroundColor:'#ff1744'} }}>Close</Button>
                    </DialogActions>
                    <DialogActions>
                        <Button variant="contained" form='editform' type='submit' sx={{backgroundColor:'#02e7d0', '&:hover':{backgroundColor:'#26a69a',}, '&:active':{backgroundColor:'#0ef0da'}}}>Edit</Button>
                    </DialogActions>
                </div>
            </Dialog>



            <Drawer anchor="right" open={opencart} onClose={()=>setOpenCart(false)} >
                <div style={{ width: '300px', padding: '20px' }}>
                            <h2>Cart</h2>
                            {
                                Object.keys(cartitems).length===0?<p>No items in Cart</p>:
                                Object.keys(cartitems).map((key)=>(
                                    <div>
                                        <Item title={cartitems[key].title} price={cartitems[key].price} img={cartitems[key].img} id={key}/>
                                    </div>
                                ))
                            }
                            {
                        Object.keys(cartitems).length!=0 && (<Button variant="contained" color="secondary" sx={{ml:'10px'}}>Proceed to Buy</Button>)
                        }
                    </div>

            </Drawer>
            
    </div>);
}

