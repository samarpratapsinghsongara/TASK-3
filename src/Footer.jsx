import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";
///
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "white",
        padding: "20px",
        marginTop: "auto",
        textAlign: "center",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            About Us
          </Typography>
          <Typography variant="body2">
            We are a team of passionate developers building great user
            experiences.
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Developed by: <br />
            Diamond CyberTech Pvt. Ltd. - Ratlam (M.P.) <br />
            BestPeers Infosystem Pvt. Ltd. - Indore (M.P.)
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Quick Links
          </Typography>
          <Link
            href="#"
            color="inherit"
            sx={{ display: "block", marginBottom: 1 }}
          >
            Home
          </Link>
          <Link
            href="#"
            color="inherit"
            sx={{ display: "block", marginBottom: 1 }}
          >
            About
          </Link>
          <Link
            href="#"
            color="inherit"
            sx={{ display: "block", marginBottom: 1 }}
          >
            Services
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="body2">
            Email: samarpratapsinghsongara78@gmail.com
          </Typography>
          <Typography variant="body2">Phone: +91 9893-709559</Typography>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Diamond CyberTech Pvt. Ltd. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
