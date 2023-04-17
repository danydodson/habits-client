import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import PlainHeader from '../../components/common/PlainHeader'
import NavMenue from '../../components/navigation/NavMenue'
import '../../components/feed/PostFeed.css'
import gathering from '../../assets/images/2.png'


// const apiEndpoint = "http://localhost:8000/api/my-profile/library";

const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/my-profile/library`

export default function LibraryPage() {

	const [library, setLibrary] = useState([])

	useEffect(() => {
		const apiCall = async () => {
			const token = localStorage.getItem("authToken")
			const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } })
			setLibrary(res.data)
		}

		apiCall()
	}, [])

	// const deleteApiEndpoint = "http://localhost:8000/api/my-profile/library/";

	const deleteApiEndpoint = `${process.env.REACT_APP_API_URL}/api/my-profile/library/`

	const deletePost = async (id) => {
		const token = localStorage.getItem("authToken")

		try {
			const res = await axios.put(deleteApiEndpoint + id + "/delete", {}, { headers: { Authorization: `Bearer ${token}` } })
			const newLibrary = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } })
			setLibrary(newLibrary.data, res)

		} catch (error) {
			console.log(error)
		}
	}


	return (
		<div>
			<PlainHeader>
			</PlainHeader>

			<div className="feeds-page">

				<div className="feed-container">
					{library[0] ? library.map((post) => {
						return (

							<div className="post-container" key={post._id}>
								<p className="date-absolute">{post.createdAt.substring(0, 10)}</p>

								<div>
									<h1>
										<Link className="post-feed-link" to={`/post/${post._id}`}> {post.title}</Link>
									</h1>
								</div>

								<div className="post-feed-user-container">
									<Link to={`/user/${post.creator._id}`}>
										<div className="profile-img-container-smw">
											<img className="profile-img-lg" src={post.creator.profileImg} alt="" />
										</div>
									</Link>

									<h3>
										<Link className="post-feed-link" to={`/user/${post.creator._id}`}> {post.creator.username} </Link>
									</h3>
								</div>

								<p>{post.description}</p>
								<img className="img-post" alt="post" src={post.image}></img>

								<button className="vote-button" onClick={() => deletePost(post._id)}><i className="fa-solid fa-trash-can vote-icon"></i></button>

							</div>
						)
					}) :
						<div className="no-saved-posts-containter">
							<p>You have no posts saved</p>
							<img id="img-women-gathering" src={gathering} alt="women working img" />
						</div>
					}
				</div>

			</div>
			<NavMenue></NavMenue>
		</div>
	)
}