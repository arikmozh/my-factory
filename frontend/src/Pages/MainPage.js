import * as React from "react";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const navigate = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let fullName = sessionStorage["fullName"];
  const handleLogout = () => {
    navigate("/");
    sessionStorage.clear();
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const menuItems = [
    {
      text: "Employee Page",
      icon: <BadgeOutlinedIcon />,
      path: "/mainPage/employeesPage",
    },
    {
      text: "Departments Page",
      icon: <ApartmentOutlinedIcon />,
      path: "/mainPage/departmentsPage",
    },
    {
      text: "Shifts Page",
      icon: <WorkHistoryOutlinedIcon />,
      path: "/mainPage/shiftsPage",
    },
    {
      text: "Users Page",
      icon: <GroupOutlinedIcon />,
      path: "/mainPage/usersPage",
    },
  ];
  const drawer = (
    <div>
      <Toolbar>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={6}>
            Welcome Back
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ textDecoration: "underline" }}>
              {fullName}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: "black" }}
              >
                {item.text}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
          <Typography variant="h6" noWrap component="div">
            MyFactory
          </Typography>
          <IconButton
            sx={{ position: "fixed", right: "20px" }}
            onClick={handleLogout}
          >
            <LogoutIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
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
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
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

export default ResponsiveDrawer;
