import axios from 'axios'
import React, {  useState } from 'react'
import { useParams } from 'react-router-dom'

const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/feed/`;


export default function CreatePostForm () {
    const { postId } = useParams()
    const storedToken = localStorage.getItem('authToken')


    const [input, setInput] = useState({
        content: ""
        })

    const handleChange = (event) => { 
        setInput (prev => {
            return {
            ...prev,
            [event.target.name]: event.target.value
            }
        })
    }

    const refreshPage = () => {
        window.location.reload(false);
      }
        
    const submitHandler = async (event) => {
        event.preventDefault()
        const {content} = input
        const obj = {
            content: content
        }
         try {
            await axios.post(`${apiEndpoint}${postId}/new-comment`, obj, {headers: {Authorization: `Bearer ${storedToken}`}})
            setInput({content: ""})
            refreshPage()
        } catch (err) {
            console.log(err)
        } 
    }

    return (
        <form className="form comment-form" onSubmit={submitHandler}>
            <div className="form-row">
                <label>Leave your comment here</label>
                <textarea name="content" rows="4" cols="39" value={input.content} onChange={handleChange}></textarea>            
            </div>
            <button className="button-blue-lg" type='submit'>Comment</button>
        </form>
    )
    
} 