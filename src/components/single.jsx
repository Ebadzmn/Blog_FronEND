import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/PostDetails.css'
import Loader from "../helper/Loader.jsx";


const PostDetails = () => {

    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`https://blogapiew.onrender.com/api/v1/blogsGetID/${postId}`);
                if (res.status === 200) {
                    setPost(res.data['data']); // Assuming your API returns the entire post object
                } else {
                    setError('Error fetching post data');
                }
            } catch (error) {
                setError('Error fetching post data');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    if (loading) {
        return <div>
            <Loader/>
        </div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (

        <div className="container mt-4">

            <h1 className="mb-4">{post.title}</h1>
            <div className="card">
                <img src={post.img} className="card-img-top" alt={post.title} />
                <div className="card-body">
                    <p>{post.content}</p>
                    <p>Create Date{post.createdAt}</p>
                    <p>Last Update Date{post.updatedAt}</p>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;


