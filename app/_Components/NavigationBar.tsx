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
import Link from "next/link";
import { Divider, ListItemIcon } from "@mui/material";
import { Category, Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { productCatagories } from "../_lib/ClientActions/actions";
import { usePathname } from "next/navigation";

function NavigationBar() {
  const [session, setSession] = React.useState<any | null>(null);
  const pathname=usePathname()
  const sn = useSession();
  React.useEffect(() => {
    if (sn.status == "authenticated") {
      console.log("this is session", sn);

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

  return (
    <AppBar
      position="sticky"
      className=" bg-black shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] select-none"
    >
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
                <MenuItem key={index} onClick={handleCloseCategory}>
                <Link href={`/shop/${category.category}`}>
                 {category.category}
                </Link> 
                </MenuItem>
                 )
                  })
                }
              </Menu>
            </Box>
            <Box className="mr-[1.4rem] transition-all duration-150 hover:bg-gray-500  px-3 py-3 rounded-full">
              <Tooltip title="Open Cart">
                <Link href={"/shop/cart"}>
                  <ShoppingCartIcon />
                </Link>
              </Tooltip>
            </Box>

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
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {session.data?.user.email[0]}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElProfile}
                    id="account-menu"
                    open={openProfile}
                    onClose={handleCloseProfile}
                    onClick={handleCloseProfile}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleCloseProfile}>
                      <Avatar /> Profile
                    </MenuItem>
                    <MenuItem onClick={handleCloseProfile}>
                      <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleCloseProfile}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      Add another account
                    </MenuItem>
                    <MenuItem onClick={handleCloseProfile}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleCloseProfile}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
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
    </AppBar>
  );
}
export default NavigationBar;
