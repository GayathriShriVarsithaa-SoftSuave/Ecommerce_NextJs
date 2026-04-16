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
import { Search } from '@mui/icons-material';
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
    const fetchdata=async()=>{
        try{
            const res=await fetch('https://dummyjson.com/products')
            if(!res.ok){
                alert("something went wrong!");
                return;
            }
            const data=await(res.json());
            setData(data.products)
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
                <Button className={style.addbtn}
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
                <ShoppingCartIcon />
            </div>
            <div className={style.searchfield}>
                <TextField placeholder='Search Products..' variant="outlined" className={style.searchbar} 
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
    </div>);
}