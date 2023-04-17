import React, { useEffect, useState } from 'react'
import NavMenue from '../../components/navigation/NavMenue'
import ProfileHeader from '../../components/profile/ProfileHeader'
import { useContext } from "react"
import { AuthContext } from '../../context/AuthContext'
import { Link } from "react-router-dom"
import MyPosts from '../../components/profile/MyPosts'
import axios from 'axios'

const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/my-profile`


export default function ProfilePage() {

	const { user } = useContext(AuthContext)
	const [currentUser, setCurrentUser] = useState(user)


	useEffect(() => {
		const apiCall = async () => {
			const token = localStorage.getItem("authToken")

			try {
				const userData = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } })
				setCurrentUser(userData.data)
			} catch (error) {
				console.log(error)
			}
		}
		apiCall()
	}, [])


	return (
		<div className="page-relative">
			<NavMenue />
			{currentUser &&
				<ProfileHeader
					profileHeadline={currentUser.username}
					userImage={currentUser.profileImg}>
					<Link to="/edit-profile" className="menue-icon-container"><i className="fa-solid fa-pen menue-icon"></i></Link>
				</ProfileHeader>
			}

			{currentUser &&
				<main>

					<div id="habit-interest" className="start-container">

						<h3>Habit Interests:</h3>

						{currentUser.myPreferences !== [] &&
							<ul className="interests-list-container">
								{currentUser.myPreferences.map((preference, index) => {
									return (
										<li key={index}>{preference}</li>
									)
								})}
							</ul>}

						{!currentUser.myPreferences[0] && <p>You havn't set any Interests, yet!</p>}

						<div className="curved corner-b-left cc-habits"></div>
					</div>

					<div id="goals" className="profile-container">
						<h3>My Goals:</h3>

						{currentUser.goals ? <p>{currentUser.goals}</p> : <p>You havn't set any Goals, yet!</p>}

						<div id="link-library-container">
							<Link className="link-blue-library" to="/library"> My Saved Posts </Link>
						</div>

						<div className="curved corner-b-left cc-goals"></div>
					</div>

					<div id="follower" className="profile-container">
						<div className="follow-container">
							<h3><Link className="follow-item" to={"/followers"}>{currentUser.followers.length} Followers </Link></h3>
							<h3><Link className="follow-item" to={"/following"}>{currentUser.following.length} Following </Link></h3>
						</div>

						<div className="curved corner-b-left cc-follower"></div>
					</div>

					<div id="post" className="profile-container nav-margin">
						<h3>My posts: </h3>
						<div className="curved corner-b-left cc-post"></div>
						<MyPosts />
					</div>



				</main>
			}

		</div>
	)
}