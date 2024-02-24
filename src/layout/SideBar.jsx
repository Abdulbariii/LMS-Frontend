import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import routes from "../routes/routeDefinations";

import Navbar from "../components/Navbar";
import IntialLayout from "./IntialLayout";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import GroupsIcon from "@mui/icons-material/Groups";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/auth/context/AuthContext";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// eslint-disable-next-line react/prop-types
export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated, toggleAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pages = [
    { name: "Home", path: routes.root.path, icon: <HomeIcon /> },
    { name: "Books", path: routes.books.path, icon: <MenuBookIcon /> },
    {
      name: "Rent Process",
      path: routes.rent.path,
      icon: <CompareArrowsIcon />,
    },
    { name: "Staff", path: routes.staff.path, icon: <GroupsIcon /> },
    {
      name: "Questions",
      path: routes.questions.path,
      icon: <QuestionAnswerIcon />,
    },
  ];
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access");
    toggleAuth();
    navigate("/login");
  };

  return isAuthenticated ? (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar color={"primary"} position="fixed" open={open}>
        <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pages.map((page) => (
            <ListItem key={page.path} disablePadding sx={{ display: "block" }}>
              <NavLink to={page.path}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText
                    color="primary"
                    primary={page.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
          <ListItem>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemText
                color="primary"
                primary="logout"
                onClick={logout}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <IntialLayout />
      </Box>
    </Box>
  ) : (
    <IntialLayout />
  );
}
