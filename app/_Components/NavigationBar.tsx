"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { Divider, ListItemIcon } from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useSession } from "next-auth/react";



function NavigationBar({session}:{session:any}) {
  const sn=useSession()
  React.useEffect(()=>{
    console.log("this is sn:",sn);
    
  },[sn.status])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  


  return (
    <AppBar  position="sticky" className="bg-black shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex justify-between px-[2rem]" >
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
   style={{fontFamily:'monospace'}} className=" space-x-2 tracking-widest"
          >
            Lets Shop
          </Typography>

         
         <Box className="flex justify-center items-center">
         <Box className="mr-[1.4rem] hover:bg-blue-500 px-3 py-3 rounded-full">
          <Tooltip title="Open Cart">
              <Link href={'/cart'}  >
         <ShoppingCartIcon />
              </Link>
            </Tooltip>

          </Box>
               
          <Box sx={{ flexGrow: 0 }}>
            {session? 
            <Box>

<Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
            <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
            </Box>


               :
               <Tooltip title="login">
                   <Button href="/auth/login" variant="outlined" className="text-white border-white" >Login</Button>
               </Tooltip>
            }
          
          </Box>
         </Box>
         
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;
