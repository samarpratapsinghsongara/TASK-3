import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Box, CardHeader, CardContent, Typography, Button } from '@mui/material';

const PostDetails = () => {
    const [, setPost] = useState(null); 
    const [editPost,setEditPost] = useState()
    const { postsId } = useParams(); 

    useEffect(() => {
        const detailData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/posts/${postsId}`);
                if (!response.ok) throw new Error('Failed to fetch post data');
                const data = await response.json();
                console.log(data);
                setPost(data);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };
        if (postsId) {
            detailData();
        }
    }, [postsId]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>Post Details</h1>
            <Card sx={{ padding: 2, marginBottom: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CardHeader
                        title={post.title}  
                        subheader={`Published on: ${new Date(post.datePublished).toLocaleDateString()}`}  
                    />
                </Box>
                <CardContent>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {post.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Likes: {post.numLikes} | Comments: {post.numComments} 
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default PostDetails;