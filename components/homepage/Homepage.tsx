"use client"
import { useState,useEffect,useRef} from 'react';
import {Dialog} from '@mui/material';
import {TablePagination} from '@mui/material';
import { Button, Drawer, TextField} from '@mui/material';
import style from './Homepage.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Thumbnail from '../thumbnail/Thumbnail';
import { generateId } from '@/helpers/generateId';
import { getproducts } from '@/api/products/productapi';
import { searchproducts } from '@/api/products/productapi';
import { addproduct } from '@/api/products/productapi';
import { CartDrawer } from '@/helpers/CartDrawer';
import DataForm, {FormData}from '@/helpers/DataForm'
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
    const [searchtext,setSearchText]=useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const scrollRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const [showsearch, setShowsearch] = useState(true);
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

    const additem=async(data:FormData)=>{
        const {title,category,price,des,img,stock,brand,rating}=data;
        if(rating==0){
            alert("Give rating for the product");
            return;
        }
        try{
            const res=await addproduct(title,category,des,price,rating,img || "",brand,stock || 0);
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
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        const handleScroll = () => {
            const currentScroll = container.scrollTop;
            if (currentScroll > lastScrollY.current) {
                setShowsearch(false); 
            } 
            else {
                setShowsearch(true);
            }
            lastScrollY.current = currentScroll;
        };
        container.addEventListener("scroll", handleScroll);
         return () => {
        container.removeEventListener("scroll", handleScroll);
    };
    }, []);
   
    return(<div className={style.tot}>
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

            <div className={style.homeitems} ref={scrollRef}>
                {
                    data.length!==0?
                        (data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item)=>
                            <Thumbnail key={item?.id} id={item?.id} img={item?.thumbnail} title={item?.title} price={item?.price} des={item?.description}/>
                        ))
                        :
                        (<p style={{textAlign:'center', fontSize:'20px'}}>No Products Found</p>)
                }
            </div>
         <TablePagination component="div"
                sx={{
                    width:'100%',
                    display: 'flex',
                    justifyContent: 'center',
                    bottom:'0',
                    backgroundColor:'whitesmoke',
                    position:'fixed'
                    
                }}
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />  
        
        <Dialog open={openform} onClose={()=>setOpenForm(false)} sx={{
            '& .MuiDialog-paper': {
            width: '600px',  
            maxWidth: '90%'  
            }
        }} >
            <DataForm onSubmit={additem} onClose={()=>setOpenForm(false)}/>
        </Dialog>

        <Drawer anchor="right" open={opendia} onClose={()=>setOpenDia(false)}  >
                <CartDrawer />
        </Drawer>
    </div>);
}