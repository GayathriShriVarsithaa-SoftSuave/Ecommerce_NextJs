"use client"
import { Button } from '@mui/material';
import style from './Item.module.css'
interface ItemProps{
    title:string,
    price:number,
    img:string,
    id:string
}
export default function Item({id,img,price,title}:ItemProps){
    return(<div className={style.itembody}>
        <p>{title}</p>
        <p>{price}</p>
        <img src={img} alt="Item image" className={style.itemimage} />
        <Button sx={{
            borderRadius: "30px",
            backgroundColor: "#ff1744",
            color: "white",
            padding: "10px",
            fontSize: "medium",
            fontWeight: 500,
            border:"0px",
            margin:"10px auto",
            '&:hover': {
            backgroundColor: "#ff5252",
            cursor:"pointer"
            },
            '&:active': {
            backgroundColor: "#ff1744",
            }
        }}>Delete</Button>
    </div>);
}