"use client"
import {useForm} from "react-hook-form";
import { Button,TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
export type FormData={
    title:string,
    category:string,
    price:number,
    des:string,
    brand:string,
    rating:number,
    stock?:number,
    img?:string,
    weight?:number,
    minorder?:number,
    actualprice?:number
}
type Props = {
  onSubmit: (data: FormData) => void;
  onClose:()=>void;
  defaultValues?:FormData;
  isedit?:boolean
};
export default function DataForm({ onSubmit,onClose,defaultValues,isedit }: Props) {
  const {register,handleSubmit,reset,formState:{errors}} = useForm<FormData>({defaultValues});
  useEffect(() => {
  if (defaultValues) {
    reset(defaultValues);
  }
}, [defaultValues, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{padding:"20px"}}>
      <IconButton onClick={onClose} sx={{
             position:"absolute",
             top:"8px",
             right:"8px"
         }}>
             <CloseIcon />
      </IconButton>
      <p style={{fontSize:"20px",paddingBottom:"10px"}}>{isedit?"Edit product Details" :"Add Product"}</p>
      <p style={{fontSize:"16px"}}>{isedit?"Edit the product details below" :"Enter details for the product to add"}</p>

      <TextField placeholder="Enter title of the product" label="Title" margin="dense" required fullWidth {...register("title")}/><br />
      <TextField label="Category" margin="dense" fullWidth required placeholder="Enter category of the product" {...register("category")}/><br />
      <TextField type="number" margin="dense" label="Price" fullWidth required placeholder="Enter price of the product" {...register("price", { required: "Price is required", valueAsNumber: true, min:1})}/><br />
      <TextField label="Description" placeholder="Enter description of the product" fullWidth margin="dense" multiline required rows={5} {...register("des")}/>
      <TextField label="Brand" required fullWidth margin="dense"   placeholder="Enter product brand"  {...register("brand")} /><br />
      {isedit?(
        <div>
            <TextField label="Actual Price" placeholder="Enter the actual price of the product" fullWidth required margin="dense" {...register("actualprice",{valueAsNumber:true})}/>
            <TextField label="Weight" placeholder="Enter product weight" fullWidth margin="dense" required {...register("weight",{valueAsNumber:true})}/>
            <TextField label="Minimum Order" placeholder="Enter minimum order" fullWidth margin="dense" required helperText={errors.minorder?.message} {...register("minorder",{valueAsNumber:true,min:{value:1,message:"Atleast 1 product should be ordered"}})} />
        </div>
    ):(
        <div>
        <TextField label="URL" placeholder="Enter product Image URL" fullWidth margin="dense" required type="url" {...register("img")}/><br />
        <TextField label="Stock" type="number" placeholder="Enter product Stock" fullWidth margin="dense" required {...register("stock", { valueAsNumber: true, min:1})}/><br /></div>
      )}
      <TextField label="Rating" placeholder="Give rating for the product" type="number" fullWidth margin="dense" required helperText={errors.rating?.message}{...register("rating",{valueAsNumber:true,min:{value:1,message:"Minimum value should be 1"},max:{value:5,message:"Maximum value should be 5"}})}/><br />
        <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
            <Button onClick={onClose} variant="contained" sx={{backgroundColor:'red', '&:hover':{backgroundColor:'#ff5252',}, '&:active':{backgroundColor:'#ff1744'} }}>Close</Button>
            <Button variant="contained" type='submit' sx={{backgroundColor:'#02e7d0', '&:hover':{backgroundColor:'#26a69a',}, '&:active':{backgroundColor:'#0ef0da'}}}>{isedit?"Edit":"Add Product"}</Button>
       </div>
    </form>
  );
}