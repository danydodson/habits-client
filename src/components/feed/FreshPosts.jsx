import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostFeed.css'
import SaveButton from '../common/SaveButton';

// const apiEndpoint = "http://localhost:8000/api/feed/fresh";
const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/feed/fresh`;

export default function FreshPosts() {
    
    const token = localStorage.getItem("authToken");
    const [freshPosts, setFreshPosts] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
                setFreshPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        };
        apiCall();
    }, [token])
    
    return (
        <div>
            
            {freshPosts.map((post) => {
                
                return (
                    
                    <div className="post-container" key={post._id}>
                        <p className="date-absolute">{post.createdAt.substring(0,10)}</p>
                        
                        <div className="post-feed-user-container">
                            <Link to={`/user/${post.creator._id}`}>
                                <div className="profile-img-container-smw">
                                    <img className="profile-img-lg" src={post.creator.profileImg} alt=""/>
                                </div>  
                             </Link>
                            <h3>
                                <Link className="post-feed-link" to={`/user/${post.creator._id}`}>@ {post.creator.username} </Link>
                            </h3>
                        </div>

                        <div className="post-title">
                            <h1>
                                <Link className="post-feed-link" to={`/post/${post._id}`}> {post.title}
                                <img className="img-post" src={post.image} alt="" /></Link>
                            </h1>
                        </div>
                        <div className="bottom-post-container">
                            <SaveButton 
                                postId={post._id}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
