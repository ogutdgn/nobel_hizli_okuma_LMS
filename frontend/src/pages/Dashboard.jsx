import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import useAuthCalls from "../service/useAuthCalls";
import AdminLayout from "../layout/AdminLayout";
import UserLayout from "../layout/UserLayout";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

function Dashboard({ role }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {user.isAdmin ? "Admin Paneli" : "Öğrenci Paneli"}
          </Typography>
          {user && (
            <Button color="inherit" onClick={logout}>
              ÇIKIŞ YAP
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: '#3f0e40', // Değiştirildi
              color: 'white', // Metin rengi
              scrollbarWidth: 'none', // Kaydırma çubuğunu gizle
              '&::-webkit-scrollbar': {
                display: 'none', // Webkit tabanlı tarayıcılarda kaydırma çubuğunu gizle
              },
            },
          }}
        >
          {user.isAdmin ? <AdminLayout /> : <UserLayout />}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: '#3f0e40', // Değiştirildi
              color: 'white', // Metin rengi
              scrollbarWidth: 'none', // Kaydırma çubuğunu gizle
              '&::-webkit-scrollbar': {
                display: 'none', // Webkit tabanlı tarayıcılarda kaydırma çubuğunu gizle
              },
            },
          }}
          open
        >
          {user.isAdmin ? <AdminLayout /> : <UserLayout />}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;
