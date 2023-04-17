import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostDetails.css'
import CreateComment from '../../components/comments/CreateComment'
import ProfileHeader from '../profile/ProfileHeader'
import Navmenue from '../navigation/NavMenue'
import SaveButton from '../common/SaveButton';

import { AuthContext } from '../../context/AuthContext';

// const apiEndpoint = "http://localhost:8000/api/feed/"
const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/feed/`;

export default function PostDetails() {

    const token = localStorage.getItem("authToken");
    const {user} = useContext(AuthContext);
    const [postDetails, setPostsDetails] = useState([]);
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    // const [comments, setComments] = useState([]);
    const {postId} = useParams();

    useEffect(() => {
        const apiCall = async () => {
            try {
                const res = await axios.get(apiEndpoint + postId, { headers: { Authorization: `Bearer ${token}` }});
                
                setPostsDetails(res.data)
                setUpvotes(res.data.upvotes.length)
                setDownvotes(res.data.downvotes.length)
                
            } catch (error) {
                console.log(error)
            }
        };
        apiCall();
    }, [postId, upvotes, downvotes, token])
    
    const commentsArray = postDetails.commentsId;
    
    const deleteComment = async (commentId) => {
        
        try {
            await axios.delete(`${apiEndpoint}${commentId}/delete`, { headers: { Authorization: `Bearer ${token}` }});
            const res = await axios.get(apiEndpoint + postId, { headers: { Authorization: `Bearer ${token}` }});
                setPostsDetails(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const refreshPage = () => {
        window.location.reload(false);
      }

    const upvoteHandler = async () => {
        try {
            const upvotingDb = await axios.put(`${apiEndpoint}${postId}/upvote`,{}, { headers: { Authorization: `Bearer ${token}` }});
            setUpvotes(upvotingDb.data.upvotes.length)
            refreshPage()
        } catch (error) {
            console.log(error)
        }
    }

    const downvoteHandler = async () => {
        try {
            const downvotingDb = await axios.put(`${apiEndpoint}${postId}/downvote`,{}, { headers: { Authorization: `Bearer ${token}` }});
            setDownvotes(downvotingDb.data.downvotes.length)
            refreshPage()
        } catch (error) {
            console.log(error)
        }
    }


  return (
         <div className="">
         {postDetails.creator &&
            <ProfileHeader
                profileHeadline={postDetails.creator.username}
                userImage={postDetails.creator.profileImg}> 
                <div><Link to={`/user/${postDetails.creator._id}`} ><i className="fa-solid fa-circle-chevron-right link-icon"></i></Link></div>

            </ProfileHeader>
            }
            <div className="detail-img-container">
                <img className="detail-img" alt="post" src={postDetails.image}></img>
            </div>
            <article className="detail-content">
                <h2>{postDetails.title}</h2>
                <p>{postDetails.description}</p>
            </article>
            <section className="detail-social-bar">
{/*                 <span><i className="fa-light fa-comment"></i> {postDetails.commentsId.length}</span>
 */}                <span>Votes:</span>
                <button className="vote-button" onClick={() => upvoteHandler()}><i className="fa-solid fa-circle-up vote-icon"></i> {upvotes}</button>
                <button className="vote-button" onClick={() => downvoteHandler()}><i className="fa-solid fa-circle-down vote-icon"></i> {downvotes}</button>
                <SaveButton 
                    postId={postId}
                />
            </section>
            
            <section id="comment-section">
                
            {postDetails.commentsId && user._id  && 
                <div>
                {commentsArray.length > 0 ? <h3>Comments:</h3> : <h3>Be the first to leave a comment!</h3>}
                
                {commentsArray.map((comment)=> {
                    return (                
                        <div className="comment-container" key={comment._id}>
                            <div className="comment-header">
                                <div className="profile-img-container-sm">
                                    <img className="profile-img-lg" src={comment.creator.profileImg} alt="user"/>
                                </div>
                                <p>@{comment.creator.username}</p>
                                {user !== null ? 
                                comment.creator._id === user._id ? <button className="bin-icon-button"onClick={()=> deleteComment(comment._id)}><i className="fa-solid fa-trash-can bin-icon"></i></button> : "" : <h2>Loading...</h2> }
                            </div>
                            <p>{comment.content}</p>
                        </div>
                    )
            })}</div>}
            <CreateComment />
                
            </section>

            <Navmenue></Navmenue>
        </div>
  )
}
