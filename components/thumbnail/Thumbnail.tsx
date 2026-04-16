"use client"
import style from './Thumbnail.module.css'
import Link from 'next/link';
import { Button, Drawer, TextField} from '@mui/material';
interface ThumbnailProps{
    id:string;
    img:string;
    title:string;
    des:string;
    price:number
};
export default function Thumbnail({id,img,title,des,price}:ThumbnailProps){
    const description=des.length>90?des.slice(0,90)+"..." : des;
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
            <Button sx={
                {
                    borderRadius: "30px",
                    backgroundColor: "#02e7d0",
                    color: "black",
                    padding: "10px",
                    fontSize: "medium",
                    fontWeight: 500,
                    border:"0px",
                    display:"block",
                    margin:"10px auto",
                    '&:hover': {
                    backgroundColor: "#26a69a",
                    cursor:"pointer"
                    },
                    '&:active': {
                    backgroundColor: "#0ef0da",
                    }
                }
            }>Add to cart</Button>
        </div>
    </div>)
}