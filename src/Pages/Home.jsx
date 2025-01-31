import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    imageUrl:
      "https://rukminim2.flixcart.com/image/850/1000/kmds4nk0/book/v/c/m/the-great-gatsby-a-novel-original-imagfarbtchuqnag.jpeg?q=20&crop=false", // Example book cover image
    description:
      "A novel set in the Jazz Age on Long Island, near New York City, that examines the lives of Jay Gatsby and Daisy Buchanan.",
  },
  {
    title: "1984",
    author: "George Orwell",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQNBAhRRTsHjZz4EXalFbeCUy7akArL9CqYA&s", // Example book cover image
    description:
      "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoc2Pnk71xdZI-B3S_UuNSA5lIEzcV9AoanQ&s", // Example book cover image
    description:
      "The narrative of the sailor Ishmael and his voyage on the whaling ship Pequod, commanded by Captain Ahab.",
  },
];

function Home() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the AuthorHub
      </Typography>

      <Typography variant="h5" gutterBottom>
        Explore Books & Authors
      </Typography>

      <Grid container spacing={4}>
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={book.title}
                height="200"
                image={book.imageUrl}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  by {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Button variant="contained" color="secondary" href="/dashboard">
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
