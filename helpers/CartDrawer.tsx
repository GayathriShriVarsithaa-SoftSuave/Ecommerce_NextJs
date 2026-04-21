"use client"
import Item from "@/components/item/Item"
import {RootState} from '../redux/store'
import { useSelector } from 'react-redux';
import { Button} from '@mui/material';
export const CartDrawer=()=>{
    const { cartitems } = useSelector((state: RootState) => state.cartitem);
    return(
        <div style={{ width: '300px', padding: '20px' }}>
            <h2>Cart</h2>
            {
                Object.keys(cartitems).length===0?<p>No items in Cart</p>:
                Object.keys(cartitems).map((key)=>(
                    <div key={`items - ${key}`}>
                        <Item title={cartitems[key].title} price={cartitems[key].price} img={cartitems[key].img} id={key}/>
                    </div>
                ))
            }
            {
            Object.keys(cartitems).length!=0 && (<Button variant="contained" color="secondary" sx={{ml:'10px'}}>Proceed to Buy</Button>)
            }
         </div>
    );
}