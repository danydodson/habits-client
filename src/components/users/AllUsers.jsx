import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import SearchUsersBar from './SearchUsersBar';
import { Link } from 'react-router-dom';
import './FindUsers.css'
import NavMenue from '../navigation/NavMenue';
import PlainHeader from '../../components/common/PlainHeader';


export default function AllUsers() {

    // const apiEndpoint = "http://localhost:8000/api/user/all";

    const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/user/all`;

    const [users, setUsers] = useState(null);
    const [userSearch, setUserSearch] = useState(users);

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");

            const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } })

            setUsers(res.data)
            setUserSearch(res.data)
        }
        apiCall()
    }, [apiEndpoint])

    const handleSearch = (value) => {
        let correctValue = value.toLowerCase()
        if (correctValue === '') {
            setUserSearch(users)
        } else {
            let searchedUsers = users.filter((user) => {
                return (user.username.toLowerCase().includes(correctValue))
            })
            setUserSearch(searchedUsers)
        }
    }


    return (
        <div>

        <PlainHeader></PlainHeader>
            
            <div className='all-container-users'>

                <SearchUsersBar onSearch={handleSearch} > </SearchUsersBar>

                <div className="all-users-container">

                    {!userSearch && <h1>Loading users...</h1>}
                    {userSearch && userSearch.map((user) => {
                        return (
                            <div className='user-container' key={user._id}>
                                <div className="profile-img-container-smw">
                                    <img className="profile-img-lg" alt='user' src={user.profileImg} />
                                </div>
                                <h3><Link to={`/user/${user._id}`}>@{user.username}</Link></h3>
                            </div>
                        )
                    })} 
                    
                </div>
            
            </div>
            <NavMenue></NavMenue>
        </div>
    )
}



