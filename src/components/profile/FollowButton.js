import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ProfileComponents.css'

// const apiEndpoint = "http://localhost:8000/api/user/"

const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/user/`;
const apiEndpointProfile = `${process.env.REACT_APP_API_URL}/api/my-profile`;


export default function FollowButton(props) {
    const {userId} = props
    const token = localStorage.getItem("authToken");

    const [followed, setFollowed] =useState("follow")   
    
    useEffect(() => {
        const apiCall = async () => {
            
            try {
                const currentUser = await axios.get(apiEndpointProfile, { headers: { Authorization: `Bearer ${token}` }})
                setFollowed(() => {
                    if (currentUser.data.following.includes(userId)) {
                        return "unfollow"
                    } else {return "follow"}
                }) 
                
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [followed, userId, token])

    

    const followHandler = async () => {

        try {
            const resFollowing = await axios.put(`${apiEndpoint}${userId}/follow`,{}, { headers: { Authorization: `Bearer ${token}` }});
            setFollowed(resFollowing, "unfollow")

        } catch (error) {
            console.log(error)
        }
    }

    const unfollowHandler = async () => {

        try {
            const resFollowing = await axios.put(`${apiEndpoint}${userId}/unfollow`,{}, { headers: { Authorization: `Bearer ${token}` }});
            setFollowed(resFollowing, "follow")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {followed === "follow"? <button className="btn-follow" onClick={() => followHandler()}>Follow</button> : <button className="btn-follow-op" onClick={() => unfollowHandler()}>UnFollow</button> }
        </div>
    )
}