"use client"
import style from './Thumbnail.module.css'
import Link from 'next/link';
import { Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addcartItem } from '@/redux/features/cartSlice';
import {generateDes} from '@/helpers/generateDes'
interface ThumbnailProps{
    id:string;
    img:string;
    title:string;
    des:string;
    price:number
};
export default function Thumbnail({id,img,title,des,price}:ThumbnailProps){
    const dispatch=useDispatch();
    const addtask=()=>{
        dispatch(addcartItem({id,item:{title,price,img}}))
        alert("Product added!!")
    }
    const description=generateDes(des);
    return(
       
    <div className={style.thumbbody}>
        <Link href={`/product/${id}`}>
            <div className={style.thumbnailbody}>
                <img src={img} alt="Thumbnail" className={style.thumbimg}/>
                <div className={style.titleprice}>
                    <p className={style.thumbtitle}>{title}</p>
                    <p className={style.thumbprice}>{price}</p>
                </div>
                <p className={style.des}>{description}</p>
            </div>
        </Link>
        <div>
            <Button onClick={()=>addtask()}
            sx={
                {
                    borderRadius: "30px",
                    backgroundColor: "#138A8A ",
                    color: "white",
                    padding: "10px",
                    fontSize: "medium",
                    fontWeight: 500,
                    border:"0px",
                    display:"block",
                    margin:"10px auto",
                    '&:hover': {
                    backgroundColor: "#19A3A3",
                    cursor:"pointer"
                    },
                    '&:active': {
                    backgroundColor: "#0F6F6F",
                    }
                }
            }>Add to cart</Button>
        </div>
    </div>)
}