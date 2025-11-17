import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function ResponsiveAppBar() {

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Product Store
        </Typography>

        <Box>
          <Button
            component={NavLink}
            to="/"
            sx={{
              marginRight: "16px",
              textDecoration: "none",
              color: "white",
              "&.active": {
                fontWeight: "bold",
              },
            }}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/product"
            sx={{
              marginRight: "16px",
              textDecoration: "none",
              color: "white",
              "&.active": {
                fontWeight: "bold",
              },
            }}
          >
            Products
          </Button>
          <Button
            component={NavLink}
            to="/post"
            sx={{
              textDecoration: "none",
              color: "white",
              "&.active": {
                fontWeight: "bold",
              },
            }}
          >
            Cart
          </Button>
          <Button
            component={NavLink}
            to="/login"
            sx={{
              textDecoration: "none",
              color: "white",
              "&.active": {
                fontWeight: "bold",
              },
            }}
          >
            LogOut
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;