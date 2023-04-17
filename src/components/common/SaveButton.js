import React, { useEffect, useState } from 'react'
import axios from 'axios'

const apiEndpointFeed = `${process.env.REACT_APP_API_URL}/api/feed/`;
const apiEndpoint = `${process.env.REACT_APP_API_URL}/api`;


export default function SaveButton(props) {
    const {postId} = props
    const token = localStorage.getItem("authToken");

    const [saved, setSaved] =useState("save")   
    
    useEffect(() => {
        const apiCall = async () => {
            
            try {
                const currentUser = await axios.get(`${apiEndpoint}/my-profile`, { headers: { Authorization: `Bearer ${token}` }})
                setSaved(() => {
                    if (currentUser.data.mySavedPosts.includes(postId)) {
                        return "unsave"
                    } else {return "save"}
                }) 
                
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [saved, postId, token])

    

    const saveHandler = async () => {

        try {
            const userData = await axios.put(`${apiEndpointFeed}${postId}/save`,{}, { headers: { Authorization: `Bearer ${token}` }});
            setSaved(userData, "unsave")

        } catch (error) {
            console.log(error)
        }
    }

    const unsaveHandler = async () => {

        try {
            const userData = await axios.put(`${apiEndpointFeed}${postId}/unsave`,{}, { headers: { Authorization: `Bearer ${token}` }});
            setSaved(userData, "save")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {saved === "save"? <button onClick={() => saveHandler()} className="vote-button"><i className="fa-regular fa-bookmark vote-icon"></i></button> : <button onClick={() => unsaveHandler()} className="vote-button"><i className="fa-solid fa-bookmark vote-icon"></i></button> }
        </>
    )
}