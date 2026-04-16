"use client"
import style from './page.module.css'
import { useState,useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Dialog} from '@mui/material';
import {DialogActions} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogContentText} from '@mui/material';
import {DialogTitle} from '@mui/material';
import {TablePagination} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { Button, Drawer, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Thumbnail from '../../components/thumbnail/Thumbnail';
type Product={
    id:string,
    title:string,
    thumbnail:string,
    price:number,
    description:string
}
export default function Homepage(){
    const [data,setData]=useState<Product[]>([]);
    const [openform,setOpenForm]=useState(false);
    const [opendia,setOpenDia]=useState(false);
    const [title,setTitle]=useState("");
    const [category,setCategory]=useState("");
    const [des,setDes]=useState("");
    const [price,setPrice]=useState(0.0);
    const [rating,setRating]=useState(0);
    const [img,setImg]=useState("");
    const [brand,setBrand]=useState("");
    const [stock,setStock]=useState(0);
    const [searchtext,setSearchText]=useState("");

    const search=(searchtxt:string)=>{
        
    }

    const additem=async()=>{
        if(rating==0){
            alert("Give rating for the product");
            return;
        }
        try{
            const res=await fetch('https://dummyjson.com/products/add',{
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
                alert("something went wrong!!");
                return;
            }
            const data=await res.json();
            localStorage.setItem(genid(),JSON.stringify(data));
            await fetchdata();
            alert("Product added");
            setOpenForm(false);
        }
        catch(err){
            alert(err);
        }
    }
    const genid=():string=>{
        const id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        })
        return (id);
    }
    const fetchdata=async()=>{
        try{
            const res=await fetch('https://dummyjson.com/products')
            if(!res.ok){
                alert("something went wrong!");
                return;
            }
            const data=await(res.json());
            const localdata=Object.keys(localStorage).map((keys)=>{
                return JSON.parse((localStorage.getItem(keys)) || '{}')
            })
            
            setData([...data.products,...localdata]);
        }
        catch(err){
            alert(err);
        }
    }
    useEffect(()=>{
        fetchdata()
    },[]);
    return(<div>
        <div className={style.homehead}>
            <div className={style.headerprod}>
                <Button className={style.addbtn} onClick={()=>setOpenForm(true)}
                sx={{
                    borderRadius: "30px",
                    backgroundColor: "#02e7d0",
                    color: "black",
                    padding: "10px",
                    fontSize: "medium",
                    fontWeight: 500,
                    width: "100px",
                    height: "50px",
                    '&:hover': {
                    backgroundColor: "#26a69a",
                    },
                    '&:active': {
                    backgroundColor: "#0ef0da",
                    }
                }}
                >Add</Button>
                <p className={style.headprodp}>PRODUCTS</p>
                <ShoppingCartIcon onClick={()=>setOpenDia(true)}/>
            </div>
            <div className={style.searchfield}>
                <TextField placeholder='Search Products..' variant="outlined" className={style.searchbar} onChange={(e)=>{setSearchText(e.target.value),search(searchtext)}}
                sx={
                    {
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                        },
                        '&:hover fieldset': {
                            border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none',
                        },
                    },
                    }   
                }/>
                <SearchIcon />
            </div>

        </div>
        

        <div className={style.homeitems}>
            {
                data.map((item)=>{
                    return(
                        <Thumbnail id={item.id} img={item.thumbnail} title={item.title} des={item.description} price={item.price}/>
                    );
                })
            }
        </div>
        <Dialog open={openform} onClose={()=>setOpenForm(false)} >
            <DialogTitle>Add a Product</DialogTitle>
            <IconButton onClick={()=>setOpenForm(false)} sx={{
                position:"absolute",
                top:"8px",
                right:"8px"
            }}>
                <CloseIcon />
            </IconButton>
            <DialogContentText sx={{textIndent:25}}>Enter details for the product to add</DialogContentText>
            <DialogContent>
                <form onSubmit={(e)=>{e.preventDefault(),additem()}} id='addform'>
                    <TextField placeholder='Enter title of the product' label='Title' required type='text'margin='dense' sx={{width:"400px"}} onChange={(e)=>{setTitle(e.target.value)}}/><br />
                    <TextField placeholder='Enter category of the product' label='Category' required type='text' margin='dense' sx={{width:"400px"}} onChange={(e)=>{setCategory(e.target.value)}}/><br />
                    <TextField placeholder='Enter price of the product' label='Price' required type='number' margin='dense' sx={{width:"400px"}}onChange={(e)=>{setPrice(Number(e.target.value))}}/><br />
                    <p>Description</p>
                    <Textarea placeholder='Enter description of the product'sx={{width:"400px"}} maxRows={5} required onChange={(e)=>{setDes(e.target.value)}}/><br />
                    <TextField placeholder='Enter product stock' label='Stock' type='number' required sx={{width:"400px"}} onChange={(e)=>setStock(Number(e.target.value))} /><br />
                    <TextField placeholder='Enter brand of the product' label='Brand' type='text' required margin='dense' sx={{width:"400px"}} onChange={(e)=>setBrand(e.target.value)}/><br />
                    <TextField placeholder='Enter product image URL' label='Image URL' required type='url' margin='dense' sx={{width:"400px"}} onChange={(e)=>setImg(e.target.value)}/>
                    <p>Rating for the product:</p>
                    <RadioGroup orientation='horizontal' sx={{gap:2}} onChange={(e)=>{setRating(Number(e.target.value))}}>
                            <Radio value="1" label='1'  variant='outlined' />
                            <Radio value="2" label="2"  variant='outlined' />
                            <Radio value="3" label="3"  variant='outlined'/>
                            <Radio value="4" label="4"  variant='outlined'/>
                            <Radio value="5" label="5"  variant='outlined'/>
                    </RadioGroup>
                </form>
            </DialogContent>
            <div className={style.buttonsform}>
                <DialogActions>
                    <Button variant="contained" onClick={()=>setOpenForm(false)} sx={{backgroundColor:'red', '&:hover':{backgroundColor:'#ff5252',}, '&:active':{backgroundColor:'#ff1744'} }}>Close</Button>
                </DialogActions>
                <DialogActions>
                    <Button variant="contained" form='addform' type='submit' sx={{backgroundColor:'#02e7d0', '&:hover':{backgroundColor:'#26a69a',}, '&:active':{backgroundColor:'#0ef0da'}}}>Add Product</Button>
                </DialogActions>
            </div>

        </Dialog>


        <Drawer open={opendia} onClose={()=>setOpenDia(false)} anchor='right'>
            <div style={{ width: '300px', padding: '20px' }}>
                    <h2>Cart</h2>
                    {
                        <p>no items in cart</p>
                    }
                    {
                        <Button>Proceed to Buy</Button>
                    }
                </div>

        </Drawer>
        
    </div>);
}