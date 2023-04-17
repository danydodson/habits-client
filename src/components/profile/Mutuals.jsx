import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Mutuals(props) {
    const {user} = useContext(AuthContext);

    // const apiEndpoint = "http://localhost:8000/api/user/mutuals";
    const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/user/mutuals`;

    const [mutuals, setMutuals] = useState([]);
    const [userChat, setUserChat] = useState({});

    //chat

    useEffect(() => {
        const apiCall = async() => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } });
                setMutuals(res.data);
            } catch (error) {
                console.log(error.response.data)
            }
        }
        apiCall();
    }, []);

    const handleUserChat = (props) => {
        // setUserChat(props);

    }
    //test
    useEffect(() => {
        props.func(userChat);  
    }, [props, userChat])

  return (
    <div>
        <h2>My Contacts</h2>
        {mutuals.map((user)=> {
            return (
                <div key={user._id}>
                    <p>{user.username}</p>
                    <button onClick={() => {handleUserChat(user)}}>Chat</button>
                </div>
            )
        })}
    </div>
  )
}
