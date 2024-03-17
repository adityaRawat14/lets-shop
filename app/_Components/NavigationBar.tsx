"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Link from "next/link";
import {  ListItemIcon, Modal } from "@mui/material";
import {  Category, Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import { addProduct, addPromocode, productCatagories } from "../_lib/ClientActions/actions";
import { usePathname } from "next/navigation";
import { CircularProgress, Snackbar } from '@mui/material';
import { FaTag } from "react-icons/fa";

function NavigationBar() {
  const [session, setSession] = React.useState<any | null>(null);
  const [subCategoryList,setSubCategoryList]=React.useState<any[] |null>([])
  const [addProductModal,setAddProductModal]=React.useState<boolean>(false);
  const [addProductSubmit,setAddProductSubmit]=React.useState({status:false,message:''})
  const [promocodeAmount,setPromocodeAmount]=React.useState({amount:0,quantity:0})
  const pathname=usePathname()
  const sn = useSession();
  React.useEffect(() => {
    if (sn.status == "authenticated") {
      setSession(sn);
    }
  }, [sn.status]);
 
  const [anchorElProfile, setAnchorElProfile] =
    React.useState<null | HTMLElement>(null);
  const [anchorElCategory, setAnchorElCategory] =
    React.useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorElProfile);
  const openCategory = Boolean(anchorElCategory);

  const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };
  const handleClickCategory = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCategory(event.currentTarget);
  };
  const handleCloseCategory = () => {
    setAnchorElCategory(null);
  };
  const handleClickAddProduct=()=>{

    setAddProductModal(!addProductModal);
  }
  const handleAddProduct=async ()=>{
    
    setAddProductSubmit({...addProductSubmit,status:true})
    const response=await addProduct(productData);
    setAddProductSubmit({...addProductSubmit,status:false})
    if(response.error){
      setAddProductSubmit({...addProductSubmit,message:'There is Some server issue Please try again later'})
    }else{
      setAddProductSubmit({...addProductSubmit,message:'Item Added Sucessfully'})
      setAddProductModal(false)
    }
    
  }


  const [productData,setProductData]=React.useState({
    description:{name:'',price:100,details:''},quantity:1,productCategory:'Electronics',productSubCategory:"Mobiles"
  })

  React.useEffect(() => {
  const el=productCatagories.find((element:any)=>{
   return  (element.category===productData.productCategory)
  })
  if(el){
    setSubCategoryList(el.subCategories)
    setProductData({...productData,productSubCategory:el?.subCategories[0]})
  }
  }, [productData.productCategory]);


  const handleToastClose=()=>{

    setAddProductSubmit({status:false,message:''})
  }
  const handleIssuePromocode=async ()=>{

  const response=await  addPromocode(promocodeAmount)
    if(response.error){
      setAddProductSubmit({status:true,message:'promocode issued sucessfully'})
    }
    else{
      setAddProductSubmit({message:response.message,status:true})
      setAddProductModal(false)
    }
  }



  return (
    <AppBar
      position="sticky"
      className=" bg-black shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] select-none"
    >
         <Snackbar
        open={addProductSubmit.message!==''}
        autoHideDuration={5000}
        message={addProductSubmit.message}
        onClose={handleToastClose}
      />
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex justify-between px-[2rem]">
      {pathname=='/shop/dashboard' ? <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />:
        <Link href={'/shop/dashboard'} className="text-white border px-3 py-1 rounded-lg border-white bg-transparent">
      Back To  Dashboard
        </Link>
      }
          <Typography
            variant="h6"
            style={{ fontFamily: "monospace" }}
            className=" space-x-2 tracking-widest"
          >
            Lets Shop
          </Typography>

          <Box className="flex justify-center items-center">
          <Box className="mr-[1.4rem] transition-all duration-150 hover:bg-gray-500  px-3 py-3 rounded-full">
              <Tooltip title="add product to the shop">
              <IconButton onClick={handleClickAddProduct}>
                  <AddBoxIcon className="text-white"/>
                </IconButton>
              </Tooltip>
              
            </Box>
            <Box className="mr-[1.4rem] transition-all duration-150 hover:bg-gray-500 rounded-full">
              <Tooltip title="categories">
                <IconButton onClick={handleClickCategory}>
                  <Category className="text-white"/>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElCategory}
                open={openCategory}
                onClose={handleCloseCategory}
                onClick={handleCloseCategory}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >

                {
                  productCatagories.map((category,index)=>{
                    return (
                <Link key={category.category} href={`/shop/${category.category}`}>
                <MenuItem onClick={handleCloseCategory}>
                 {category.category}
                </MenuItem>
                </Link> 
                 )
                  })
                }
              </Menu>
            </Box>
                <Link href={"/shop/cart"}>
            <Box className="mr-[1.4rem] transition-all duration-150 hover:bg-gray-500  px-3 py-3 rounded-full">
              <Tooltip title="Open Cart">
                  <ShoppingCartIcon />
              </Tooltip>
            </Box>
                </Link>

            <Box sx={{ flexGrow: 0 }}>
              {session ? (
                <Box>
                  <Tooltip title={session.data?.user.email}>
                    <IconButton
                      onClick={handleClickProfile}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={openProfile ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openProfile ? "true" : undefined}
                    >
                      <Avatar className="bg-white text-black" sx={{ width: 32, height: 32 }}>
                        {session.data?.user.email[0]}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                  className=""
                    anchorEl={anchorElProfile}
                    id="account-menu"
                    open={openProfile}
                    onClose={handleCloseProfile}
                    onClick={handleCloseProfile}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleCloseProfile} className="px-6">
      
                      <Avatar className="mr-6" /> Profile
                    </MenuItem>
                    <MenuItem onClick={handleCloseProfile} className="px-6">
                      <ListItemIcon className="pr-5">
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <button onClick={()=>{signOut()}}>
                        Logout
                      </button>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Tooltip title="login">
                  <Button
                    href="/auth/login"
                    variant="outlined"
                    className="text-white border-white"
                  >
                    Login
                  </Button>
                </Tooltip>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
      <Modal
        open={addProductModal}
        onClose={handleClickAddProduct}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box className=" w-[50rem]  absolute top-0 bottom-0 ">
        <div className="container mx-auto px-4 py-5">
        <form onSubmit={(e)=>{e.preventDefault()}} className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input  onChange={(e)=>{setProductData({...productData,description : {...productData.description,name:e.target.value}})}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="string" placeholder="Name" />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Price
                </label>
                <input   onChange={(e)=>{setProductData({...productData,description : {...productData.description, price :Number(e.target.value)}})}}  value={productData.description.price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Price" />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category
                </label>
                <select onChange={(e)=>{setProductData({...productData,productCategory : (e.target.value)})}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category">
                  {
                    productCatagories.map((category)=>{
                      return (
                        <option key={category.category} value={category.category}>{category.category}</option>
                      )
                    })
                  }  
                   
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
                    Subcategory
                </label>
                <select  onChange={(e)=>{setProductData({...productData,productSubCategory : (e.target.value)})}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subcategory">
                    <option value="default" disabled>Select Subcategory</option>
                    {
                 subCategoryList?.map((el)=>{
                  return (
                    <option value={el} key={el}>{el}</option>
                  )
                 })
                    }
                </select>
            </div>
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
                    Quantity
                </label>
                <input value={productData.quantity} onChange={(e)=>{setProductData({...productData,quantity : Number(e.target.value)})}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="quantity" type="number" placeholder="quantity" />
              
            </div>
            <div className="">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
                    Details
                </label>
                <textarea value={productData.description.details} onChange={(e)=>{setProductData({...productData,description:{...productData.description,details:e.target.value}})}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="details"  placeholder="Product Details" />
              
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                    Image
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" placeholder="image" />
              
            </div>
            <div className="flex items-center justify-between">
                <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleAddProduct}>
                 { addProductSubmit.status? <CircularProgress size={20}/>:  'Add Product'}
                </button>
                <div className="flex items-center gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="promocodeInput" className="text-[10px] text-gray-700">Enter Amount for promocode</label>
                    <input onChange={(e)=>{setPromocodeAmount({...promocodeAmount,amount:Number(e.target.value)})}} id="promocodeInput" className="border-[2px] border-gray-300 outline-none text-[15px] placeholder:text-sm placeholder:font-sans px-2 rounded-lg" type="number" placeholder="amount" />
                  </div>
                  <select name="" id=""   onChange={(e)=>{setPromocodeAmount({...promocodeAmount,quantity:Number(e.target.value)})}} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button onClick={handleIssuePromocode}  className="bg-yellow-400 flex items-center gap-2 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Generate Promocode
                    <FaTag/>
                  </button>
                </div>
   
            </div>
        </form>
    </div>
        </Box>
      </Modal>
    </AppBar>
  );
}
export default NavigationBar;
