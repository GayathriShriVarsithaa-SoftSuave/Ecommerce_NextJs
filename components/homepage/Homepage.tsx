"use client"
import style from './Homepage.module.css'
import { useState,useEffect,useRef} from 'react';
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
import Thumbnail from '../thumbnail/Thumbnail';
import {RootState} from '../../redux/store'
import { useSelector } from 'react-redux';
import Item from '../item/Item'
import { generateId } from '@/helpers/generateId';
import { getproducts } from '@/api/products/productapi';
import { searchproducts } from '@/api/products/productapi';
import { addproduct } from '@/api/products/productapi';
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
    const { cartitems } = useSelector((state: RootState) => state.cartitem);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
     useEffect(()=>{
          const timer = setTimeout(() => {
            search(searchtext);
            }, 500);
            return () => clearTimeout(timer);
    },[searchtext]);
    const search=async(searchtxt:string)=>{
        if(searchtxt===''){
            fetchdata();
        }                                                                                                                                                                                                                                                                
        else{
            try{
                const res=await searchproducts(searchtxt)
                if(!res.ok){
                    alert("Something went wrong!");
                    return;
                }
                const data= await res.json();
                const localprod=Object.keys(localStorage).map((keys)=>{
                const pro = localStorage.getItem(keys);
                    return pro ? JSON.parse(pro) : null;
                })
                .filter((pro) =>
                        pro.title.toLowerCase().includes(searchtxt.toLowerCase())
                    );
                setData([...data.products,...localprod]);
            }
            catch(err){
                alert(err);
            }
        }
    }

    const additem=async()=>{
        if(rating==0){
            alert("Give rating for the product");
            return;
        }
        try{
            const res=await addproduct(title,category,des,price,rating,img,brand,stock);
            if(!res.ok){
                alert("something went wrong!!");
                return;
            }
            const data=await res.json();
            localStorage.setItem(generateId(),JSON.stringify(data));
            await fetchdata();
            alert("Product added");
            setOpenForm(false);
        }
        catch(err){
            alert(err);
        }
    }
    const fetchdata=async()=>{
        try{
            const res = await getproducts();
            if (!res.ok) {
                alert("something went wrong!");
                return;
            }
            const data = await res.json();
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
    const scrollRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const [showsearch, setShowsearch] = useState(true);
        useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
        const currentScroll = container.scrollTop;
        if (currentScroll > lastScrollY.current) {
        setShowsearch(false); 
        } else {
        setShowsearch(true);
        }
        lastScrollY.current = currentScroll;
    };
    container.addEventListener("scroll", handleScroll);
    }, []);
   

    return(<div ref={scrollRef} className="flex-1 overflow-y-auto h-screen">
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
        </div>

        <div className={style.searchfield} style={{
            position: "fixed", 
            left:"10%",
            alignItems: "center",
            top: showsearch ? "60px" : "-80px", 
            transition: "top 0.5s ease",
            zIndex: 1
        }}>
            <TextField placeholder='Search Products..' variant="outlined" className={style.searchbar} onChange={(e)=>{setSearchText(e.target.value)}}
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

       
        
            <div className={style.homeitems} >
                {
                    data.length!==0?
                        (data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item)=>
                            <Thumbnail key={item?.id} id={item?.id} img={item?.thumbnail} title={item?.title} price={item?.price} des={item?.description}/>
                        ))
                        :
                        (<p style={{textAlign:'center', fontSize:'20px'}}>No Products Found</p>)
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


        <Drawer anchor="right" open={opendia} onClose={()=>setOpenDia(false)}  >
                <div style={{ width: '300px', padding: '20px' }}>
                            <h2>Cart</h2>
                            {
                                Object.keys(cartitems).length===0?<p>No items in Cart</p>:
                                Object.keys(cartitems).map((key)=>(
                                    <div>
                                        <Item title={cartitems[key].title} price={cartitems[key].price} img={cartitems[key].img} id={key}/>
                                    </div>
                                ))
                                
                            }
                            {
                        Object.keys(cartitems).length!=0 && (<Button variant="contained" color="secondary" sx={{ml:'10px'}}>Proceed to Buy</Button>)
                        }
                    </div>

            </Drawer>
       
            <TablePagination component="div"
                sx={{
                    width:'100%',
                    display: 'flex',
                    justifyContent: 'center',
                    position:'fixed',
                    bottom:'0',
                    backgroundColor:'whitesmoke'
                }}
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />  
    </div>);
}