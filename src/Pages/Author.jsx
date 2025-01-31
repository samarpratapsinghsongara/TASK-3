import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
  Pagination,
  TextField,
  MenuItem,
  ListItemText
} from "@mui/material";

function Author() {
  const [author, setAuthor] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  let URL = "http://localhost:3000/authors";
 
  const authorData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAuthor(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    authorData();
  }, []);

  const navigate = useNavigate();

  const handlenavigate = (authorId) => {
    navigate(`/authors/${authorId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          Loading, please wait...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          color: "error.main",
        }}
      >
        <Typography variant="h6">Error: {error}</Typography>
      </Box>
    );
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  
  const filterAuthor = author.filter((author) => {
    const fullName = `${author.firstName} ${author.lastName}`.toLowerCase();
    return fullName.startsWith(searchText.toLowerCase());
  });

  const displayAuthor = filterAuthor.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 3, 
          marginTop: 3,
          position: "relative", 
          display:"flex",
          flexDirection:"column",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={handleSearchChange}
          sx={{ marginRight: 1 }} 
          fullWidth
        />
          
        
        {searchText && filterAuthor.length > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",  
              left: 0,
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #ccc",
              boxShadow: 3,
              zIndex: 10,
              borderRadius: 2,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {filterAuthor.slice(0, 5).map((author) => (
              <MenuItem
                key={author.id}
                onClick={() => {
                  setSearchText(`${author.firstName} ${author.lastName}`);
                }}
              >
                <ListItemText primary={`${author.firstName} ${author.lastName}`} />
              </MenuItem>
            ))}
          </Box>
        )}
      </Box>

      <Grid container spacing={2} sx={{ padding: 2 }}>
        {displayAuthor.map((author, Index) => (
          <Grid item xs={12} sm={6} md={4} key={Index}>
            <Card
              sx={{
                maxWidth: 345,
                margin: "auto",  
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "background.paper",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
                display: "flex",
                flexDirection: "column",  
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  {author.firstName} {author.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 1 }}
                >
                  Phone: {author.phone}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        sx={{ color: "primary.dark" }}
                      >
                        Posts:
                      </Typography>
                      <Typography variant="h6" sx={{ color: "success.main" }}>
                        {author.numPosts}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        sx={{ color: "primary.dark" }}
                      >
                        Comments:
                      </Typography>
                      <Typography variant="h6" sx={{ color: "info.main" }}>
                        {author.numComments}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        sx={{ color: "primary.dark" }}
                      >
                        Likes:
                      </Typography>
                      <Typography variant="h6" sx={{ color: "warning.main" }}>
                        {author.numLikes}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>

              <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={() => handlenavigate(author.id)}
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%" }}
                >
                  Profile
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Adjusted Pagination Box */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3, marginBottom: 5 }}>
        <Pagination
          count={Math.ceil(filterAuthor.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
}

export default Author;
