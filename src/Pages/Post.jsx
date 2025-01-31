import React, { useEffect, useState } from "react";
import {
  Card,
  Box,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Pagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  TextField
} from "@mui/material";
import { Comment, ThumbUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [postIdToDelete,setPostIdToDelete] = useState(null)
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState(""); 
  const [editDescription, setEditDescription] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const navigate = useNavigate();
  const [newPost,setNewPost]=useState({
    title:"",
    description:"",
  });

  const itemsPerPage = 6;

  const postData = async () => {
    try {
      const URL = "http://localhost:3000/posts";
      const response = await fetch(URL);
      const data = await response.json();
      setPost(data.reverse());
    } catch (error) {
      setError(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    postData();
  }, []);

  if (loader) {
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

  const displayPosts = post.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
) 


  const handleNavigate = (postsId) => {
    if (postsId) navigate(`/posts/${postsId}`);
  };

  const handleDeleteClick = (postId) => {
    console.log("delete button")
    setPostIdToDelete(postId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPostIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (postIdToDelete) {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postIdToDelete}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPost(post.filter((p) => p.id !== postIdToDelete));
          setOpenDialog(false);
          setPostIdToDelete(null);
        } else {
          console.log("Failed to delete Post");
        }
      } catch (error) {
        console.log("Error in deleting", error);
      }
    }
  };

  
  const handleEdit = (post) => {
    setEditPostId(post.id);
    setEditTitle(post.title);
    setEditDescription(post.description);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = async () => {
    if (editPostId) {
      try {
        
        const originalPost = post.find(p => p.id === editPostId);
        
        const updatedPost = {
          ...originalPost,  
          title: editTitle,
          description: editDescription,
        };
  
        const response = await fetch(`http://localhost:3000/posts/${editPostId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        });
  
        if (response.ok) {
          const data = await response.json();
          
        
          setPost((prevPosts) =>
            prevPosts.map((p) => (p.id === data.id ? data : p))
          );
          
          setOpenEditDialog(false);
          setEditTitle("");
          setEditDescription("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };



const handleCreateSave = async()=>{
  const newPostData = {
  ...newPost,
  id:(Math.floor(Math.random()*11111)+9999).toString(),
  authorId:Math.floor(Math.random()*11111)+9999,
  numLikes:Math.floor(Math.random()*10),
  numComments:Math.floor(Math.random()*10),
  datePublished: new Date().toISOString(),
  };
  try{
  const response = await fetch("http://localhost:3000/posts",{
  method:"POST",
  headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPostData),
  });
  if(response.ok){
  const data = await response.json();
  setPost([data,...post]);
  setOpenCreateDialog(false);
  setNewPost({title:"",description:""})
  }
  else{
  console.log("failed to create a post")
  }
  }
  catch(error){
  console.log(error);
  }
}


  

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ marginBottom: 3, display: "flex", justifyContent: "flex-start" }}>
        <Button variant="contained" color="primary" onClick={()=>setOpenCreateDialog(true)  }>
          Create Post
        </Button>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {displayPosts.map((post, Index) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 5,  
                      overflow: "hidden",
                    }}
                  >
                    {post.description}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Published on: {new Date(post.datePublished).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 2 }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <IconButton disabled>
                      <ThumbUp />
                      <Typography variant="body2" color="text.secondary">
                        {post.numLikes}
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton disabled>
                      <Comment />
                      <Typography variant="body2" color="text.secondary">
                        {post.numComments}
                      </Typography>
                    </IconButton>
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, marginTop: 2 }}>
                  <Button variant="contained" color="primary" onClick={() => handleNavigate(post.id)}>
                    View Post Details
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(post.id)}
                  >
                    Delete Post
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(post)}
                  >
                    Edit Post
                  </Button>
                </Box> 
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Pagination count={Math.ceil(post.length / itemsPerPage)} page={page} onChange={handlePageChange} color="primary" />
      </Box>

    
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCreateDialog} onClose={()=>setOpenCreateDialog(false)}>
      <DialogTitle>Add a New Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          value={newPost.title}
          onChange={(e)=>setNewPost({...newPost,title:e.target.value})}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={newPost.description}
          onChange={(e)=>setNewPost({...newPost, description:e.target.value})}         
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpenCreateDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateSave} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default Post;
