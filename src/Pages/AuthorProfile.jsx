import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  CardHeader,
  CardActions,
  Button,
  Divider,
  Avatar,
} from "@mui/material";   

const AuthorProfile = () => {
  const [authorProfile, setAuthorProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const { authorId } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    if (!authorId) {
      console.log("No authorId found");
      return;
    }
    try {
      const authorResponse = await fetch(
        `http://localhost:3000/authors/${authorId}`
      );
      if (!authorResponse.ok) {
        throw new Error("Failed to fetch author data");
      }
      const authorData = await authorResponse.json();
      setAuthorProfile(authorData);

      const postsResponse = await fetch("http://localhost:3000/posts");
      if (!postsResponse.ok) {
        throw new Error("Failed to fetch posts data");
      }

      const postsData = await postsResponse.json();
      setPosts(
        postsData.filter((post) => post.authorId === parseInt(authorId))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authorId]);

  if (!authorProfile) {
    return <p>Loading...</p>;
  }

  const topLikes = () => {
    const sortedPosts = [...posts].sort((a, b) => b.numLikes - a.numLikes);
    const topSix = sortedPosts.slice(0, 6);
    setPosts(topSix);
  };

  const topComments = () => {
    const sortedPosts = [...posts].sort((a, b) => b.numComments - a.numComments);
    const topSix = sortedPosts.slice(0, 6);
    setPosts(topSix);
  };

  const handleNavigate = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      <Grid container justifyContent="center" spacing={3} sx={{ padding: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              maxWidth: 345,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "background.paper",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{ width: 56, height: 56, mr: 2 }}
                  src={`https://i.pravatar.cc/150?img=${authorProfile.id}`}
                  alt="author-avatar"
                />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                  }}
                >
                  {authorProfile.firstName} {authorProfile.lastName}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Phone: {authorProfile.phone}
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body2" sx={{ color: "primary.dark" }}>
                      Posts:
                    </Typography>
                    <Typography variant="h6" sx={{ color: "success.main" }}>
                      {authorProfile.numPosts}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" sx={{ color: "primary.dark" }}>
                      Comments:
                    </Typography>
                    <Typography variant="h6" sx={{ color: "info.main" }}>
                      {authorProfile.numComments}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" sx={{ color: "primary.dark" }}>
                      Likes:
                    </Typography>
                    <Typography variant="h6" sx={{ color: "warning.main" }}>
                      {authorProfile.numLikes}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: -15, marginTop: 3, marginBottom: 3 }}>
        <Button onClick={topLikes} variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Top Likes
        </Button>
        <Button onClick={topComments} variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Top Comments
        </Button>
      </Box>

      <Grid container spacing={3}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardHeader
                  title={post.title}
                  subheader={`Published on: ${new Date(
                    post.datePublished
                  ).toLocaleDateString()}`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {post.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Likes: {post.numLikes} | Comments: {post.numComments}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button onClick={() => handleNavigate(post.id)} size="small">Post Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              No Posts Found
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default AuthorProfile;
