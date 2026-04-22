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
import Link from 'next/link';
import { addcartItem } from '@/redux/features/cartSlice';
import { Drawer } from '@mui/joy';
import { useParams } from 'next/navigation';
import { getsingleproduct } from '@/api/products/productapi';
import { delproduct } from '@/api/products/productapi';
import { updateproduct } from '@/api/products/productapi';
import {CartDrawer} from '../../helpers/CartDrawer'
import ArrowForward from '@mui/icons-material/ArrowForwardIosTwoTone';
import ArrowBack from '@mui/icons-material/ArrowBackIosNewTwoTone';
import DataForm,{FormData} from '@/helpers/DataForm';
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

export default function Productdetails(){
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
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
    const [title1,setTitle1]=useState(title);
    const [des1,setDes1]=useState(des);
    const [rating1,setRating1]=useState(rating);
    const [category1,setCategory1]=useState(category);
    const [price1,setPrice1]=useState(price);
    const [actualprice1,setActualPrice1]=useState(actualprice);
    const [brand1,setBrand1]=useState(brand);
    const [weight1,setWeight1]=useState(weight);
    const [minorder1,setMinOrder1]=useState(minorder);
    const [index,setIndex]=useState(0);
    const reviews=data?.reviews || [];
    const addtask=()=>{
        dispatch(addcartItem({id:id || "",item:{title,price,img:data?.images[0] || ''}}))
        setOpenCart(true);
    }
    const updateitem=async()=>{
        try{
            const res=await updateproduct(id || "",title1,category1,price1,actualprice1,rating1,des1,brand1,weight1,minorder1);
            setTitle(title1);
            setDes(des1);
            setCategory(category1);
            setBrand(brand1);
            setWeight(weight1);
            setMinOrder(minorder1);
            setActualPrice(actualprice1);
            setPrice(price1);
            setRating(rating1);
            setDiaOpen(false); 
            alert("Updated");
        }
        catch(err){
            alert(err);
        }
    }
    const delprod=async()=>{
        try{
            const res=await delproduct(id || "");
            alert("Product Deleted!");
            router.push("/");
        }
        catch(err){      
            alert(err);
        }
    }
    
    const fetchdata=async()=>{
        try{
            const res=await getsingleproduct(id || "");
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
   const next = () => {
        setIndex((prev)=>(prev+1)%reviews.length);
    };  

    const prev = () => {
        setIndex((prev)=>(prev-1+reviews.length)%reviews.length);
    };
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
                {reviews.length > 0 ? 
                    (
                        <div className={style.body2}>
                            <button onClick={prev} className={style.btn}><ArrowBack/></button>
                            <div className={style.rate}>
                                <p className={style.txttitle}>
                                    Rating : {reviews[index]?.rating}
                                </p>
                                <p>Comment : {reviews[index]?.comment}</p>
                                <p>Date : {reviews[index]?.date}</p>
                                <p>ReviewerName : {reviews[index]?.reviewerName}</p>
                                <p>ReviewerMail : {reviews[index]?.reviewerEmail}</p>
                            </div>
                            <button onClick={next} className={style.btn}><ArrowForward/></button>
                        </div>
                    ) : 
                    (<p>No reviews available</p>)
                }

            <div className={style.btns}>
                <Button variant="contained"  className='deletebtn' onClick={delprod}
                sx={{backgroundColor:'red', '&:hover':{backgroundColor:'#ff5252',}, '&:active':{backgroundColor:'#ff1744'} }}>Delete</Button>
                <Button variant="contained"
                sx={{backgroundColor:'#02e7d0', '&:hover':{backgroundColor:'#26a69a',}, '&:active':{backgroundColor:'#0ef0da'}}} className='updatebtn' onClick={()=>{setDiaOpen(true);setTitle1(title);setPrice1(price);setCategory1(category);setDes1(des);
                    setActualPrice1(actualprice);setBrand1(brand);setRating1(rating);setWeight1(weight);setMinOrder1(minorder);
                }}>Update</Button>
            </div>

            <Dialog open={diaopen} onClose={()=>setDiaOpen(false)} sx={{
                '& .MuiDialog-paper': {
                width: '600px',   
                maxWidth: '90%'  
                }
            }}>
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
                        value={title1}
                        required
                        label='Title'
                        margin="dense"
                        onChange={(e)=>setTitle1(e.target.value)}
                        /><br></br>
                        <TextField 
                            sx={{ width: '100%' }}
                            margin="dense"
                            required
                        value={category1}
                        label='Category'
                        onChange={(e)=>setCategory1(e.target.value)}/><br />
                        <TextField 
                            sx={{ width: '100%' }}
                            margin="dense"
                        required
                        value={price1}
                        label='Price'
                        onChange={(e)=>setPrice1(Number(e.target.value))}/><br/>
                        <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        required
                        value={actualprice1}
                        label='Actual Price'
                        onChange={(e)=>setActualPrice1(Number(e.target.value))}
                        />
                        <TextField 
                        value={des1}
                        rows={4}
                        multiline
                        required
                        margin='dense'
                        label='Description'
                        onChange={(e)=>setDes1(e.target.value)}
                        sx={{width:"100%"}}/>
                        <TextField
                        sx={{width:'100%'}}
                        required
                        margin="dense"
                        value={rating1}
                        label='Rating'
                        type='Number'
                        onChange={(e)=>setRating1(Number(e.target.value))}
                        />
                        <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        required
                        value={brand1}
                        label="Brand"
                        onChange={(e)=>setBrand1(e.target.value)}
                        />
                        <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        required
                        value={weight1}
                        label="Weight"
                        type='Number'
                        onChange={(e)=>setWeight1(Number(e.target.value))}
                        />
                         <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        value={minorder1}
                        label="Minimum Order"
                        type='Number'
                        required
                        onChange={(e)=>setMinOrder1(Number(e.target.value))}
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
                <CartDrawer />
            </Drawer> 
    </div>);
}

