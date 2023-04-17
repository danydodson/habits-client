import './ProfilePages.css'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavMenue from '../../components/navigation/NavMenue'
import axios from 'axios'
import ProfileHeader from '../../components/profile/ProfileHeader'
import FollowButton from '../../components/profile/FollowButton'

const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/user/`

export default function PublicProfile() {

	const [userProfile, setUserProfile] = useState({})
	const { userId } = useParams()

	useEffect(() => {
		const apiCall = async () => {
			const token = localStorage.getItem("authToken")
			try {
				const res = await axios.get(apiEndpoint + (userId), { headers: { Authorization: `Bearer ${token}` } })
				setUserProfile(res.data)

			} catch (error) {
				console.log(error)
			}
		}
		apiCall()
	}, [userId])


	return (
		<div>
			{userProfile && (

				<section>
					<ProfileHeader
						profileHeadline={userProfile.username}
						userImage={userProfile.profileImg}>
						<FollowButton
							userId={userId}
						/>
					</ProfileHeader>

					<div id="habit-interest" className="start-container">
						<h3>Habit Interests:</h3>

						{userProfile.myPreferences &&
							<ul className="interests-list-container">
								{userProfile.myPreferences.map((preference, index) => {
									return (
										<li key={index}>{preference}</li>
									)
								})}
							</ul>}
					</div>

					<div id="goals" className="profile-container">
						<h3>Goals:</h3>
						{userProfile.goals ? <p>{userProfile.goals}</p> : <p>Haven't set any goals yet!</p>}

						<div className="curved corner-b-left cc-goals"></div>
					</div>

					<div id="post" className="profile-container nav-margin">
						<h3>Posts</h3>
						<div>

							{userProfile.myPosts &&
								userProfile.myPosts.map((post, index) => {
									return (
										<div className="post-container" key={index}>
											<div className="post-title">
												<h3>
													<Link className="post-feed-link" to={`/post/${post._id}`}> {post.title}</Link>
												</h3>

												<p className="date-absolute">{post.createdAt.substring(0, 10)}</p>
											</div>

											<img className="img-post" src={post.image} alt=""></img>
											<p>{post.description}</p>

										</div>
									)
								})}
						</div>

						<div className="curved corner-b-left cc-post"></div>
					</div>
				</section>)
			}
			<NavMenue />
		</div>
	)
}