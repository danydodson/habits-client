import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, NavLink} from 'react-router-dom';
import './FindUsers.css'
import NavMenue from '../navigation/NavMenue';
import gathering from '../../assets/images/2.png'
import PlainHeader from '../../components/common/PlainHeader';

// const apiEndpoint = "http://localhost:8000/api/user/followers"
const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/user/followers`;


export default function Followers() {

    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
                setFollowers(res.data.followers)

            } catch (error) {
                console.log(error)
            }
        };
        apiCall();
    }, [])

  return (
    <div>
    
     <PlainHeader></PlainHeader>

        <div className='all-container-users'>

            <div className='fix-header-container'>
                <NavLink className="feed-links" to={"/followers"}>Followers</NavLink>
                <NavLink className="feed-links" to={"/following"}>Following</NavLink>
            </div>

            <h3>Souls that follow you</h3>

            <div>

                {followers[0] ? followers.map((user)=> {
                return (<div className='user-container' key={user.username}>
                    <div className="profile-img-container-smw">
                        <img className="profile-img-lg" alt='user profile' src={user.profileImg}></img>
                    </div>
                    <p><Link to={`/user/${user._id}`}>@{user.username}</Link></p>
                    </div>)
                }): 

                <div className='users-box'>
                    <p> You have no followers yet</p>
                    <p>Share your thoughts on the feed page and find souls-alike</p>
                    <img id="img-women-gathering" src={gathering} alt="women working img"/>
                </div>
                }

            </div>
        </div>

        <NavMenue></NavMenue>
    </div>
  )
}
