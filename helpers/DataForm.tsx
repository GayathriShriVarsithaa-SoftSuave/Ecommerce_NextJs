"use client"
import {useForm} from "react-hook-form";
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { Button, Drawer, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export type FormData={
    title:string,
    category:string,
    price:number,
    des:string,
    brand:string,
    rating:number,
    stock:number,
    img:string
}
type Props = {
  onSubmit: (data: FormData) => void;
  onClose:()=>void;
};
export default function DataForm({ onSubmit,onClose }: Props) {
  const {register,handleSubmit} = useForm<FormData>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} style={{padding:"20px"}}
    >
         <IconButton onClick={onClose} sx={{
                position:"absolute",
                top:"8px",
                right:"8px"
            }}>
                <CloseIcon />
        </IconButton>
      <p style={{fontSize:"20px",paddingBottom:"10px"}}>Add Product</p>
      <p style={{fontSize:"16px"}}>Enter details for the product to add</p>

      <TextField
        placeholder="Enter title of the product"
        label="Title"
        margin="dense"
        required
        fullWidth
        {...register("title")}
      /><br />

      <TextField
      label="Category"
      margin="dense"
      fullWidth
      required
        placeholder="Enter category of the product"
        {...register("category")}
      /><br />

      <TextField
        type="number"
        margin="dense"
        label="Price"
        fullWidth
        required
        placeholder="Enter price of the product"
        {...register("price", {
          required: "Price is required",
          valueAsNumber: true,
          min:1
        })}
      /><br />

      <TextField
      label="Description"
        placeholder="Enter description of the product"
        fullWidth
        margin="dense"
        multiline
        required
        rows={5}
        {...register("des")}
      />

      <TextField
      label="URL"
        placeholder="Enter product Image URL"
        fullWidth
        margin="dense"
        required
        {...register("img")}
      /><br />

      <TextField
      label="Stock"
        type="number"
        placeholder="Enter product Stock"
        fullWidth
        margin="dense"
        required
        {...register("stock", {
          valueAsNumber: true,
          min:1
        })}
      /><br />

      <TextField
      label="Brand"
      required
      fullWidth
      margin="dense"
        placeholder="Enter product brand"
        {...register("brand")}
      /><br />

      <p>Rating:</p>
      <RadioGroup orientation='horizontal' sx={{gap:3}} {...register("rating")}>
                            <Radio value={1} label='1'  variant='outlined' />
                            <Radio value={2} label="2"  variant='outlined' />
                            <Radio value={3} label="3"  variant='outlined'/>
                            <Radio value={4} label="4"  variant='outlined'/>
                            <Radio value={5} label="5"  variant='outlined'/>
        </RadioGroup><br />
        <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
      <Button onClick={onClose} variant="contained" sx={{backgroundColor:'red', '&:hover':{backgroundColor:'#ff5252',}, '&:active':{backgroundColor:'#ff1744'} }}>Close</Button>
       <Button variant="contained" type='submit' sx={{backgroundColor:'#02e7d0', '&:hover':{backgroundColor:'#26a69a',}, '&:active':{backgroundColor:'#0ef0da'}}}>Add Product</Button>
       </div>
    </form>
  );
}