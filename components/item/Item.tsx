"use client"
import { Button } from '@mui/material';
import style from './Item.module.css'
import { useDispatch } from 'react-redux';
import { deleteCartItem } from '@/redux/features/cartSlice';
interface ItemProps{
    title:string,
    price:number,
    img:string,
    id:string
}
export default function Item({id,img,price,title}:ItemProps){
    const dispatch=useDispatch();
    const delitem=()=>{
        dispatch(deleteCartItem(id))
    }
    return(<div className={style.itembody}>
        <p>{title}</p>
        <p>{price}</p>
        <img src={img} alt="Item image" className={style.itemimage} />
        <Button onClick={()=>delitem()}
        sx={{
            borderRadius: "30px",
            backgroundColor: "#da5050",
            color: "white",
            padding: "10px",
            fontSize: "medium",
            fontWeight: 500,
            border:"0px",
            margin:"10px auto",
            '&:hover': {
            backgroundColor: "#c74444",
            cursor:"pointer"
            },
            '&:active': {
            backgroundColor: "#a83636",
            }
        }}>Delete</Button>
    </div>);
}