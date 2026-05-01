
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
type CartItem={
    title:string,
    price:number,
    img:string
}
type CartItemMap={
    [key:string]:CartItem
}
interface CartItemState{
    cartitems:CartItemMap
}
const initialState: CartItemState = {
  cartitems:{}
};
export const cartSlice=createSlice({
    name:'cartitem',
    initialState,
    reducers:{
        addcartItem:(state,action:PayloadAction<{id:string; item:CartItem}>)=>{
            state.cartitems[action.payload.id]=action.payload.item;
        },
        deleteCartItem:(state,action:PayloadAction<string>)=>{
            delete state.cartitems[action.payload];
        }
    }
})
export const {addcartItem,deleteCartItem} = cartSlice.actions;
export default cartSlice.reducer;