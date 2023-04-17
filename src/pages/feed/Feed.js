import React, { useState } from 'react'
import NavMenue from '../../components/navigation/NavMenue'
import PlainHeader from '../../components/common/PlainHeader'
import ModalModule from '../../components/common/ModalModule'
import CreatePostForm from '../../components/post/CreatePostForm'
import './feed.css'
import { NavLink } from 'react-router-dom'

export default function Feed(props) {
    const [isOpen, setIsOpen] = useState(false)

    const refreshPage = () => {
        window.location.reload(false)
    }

    const closeModal = () => {
        setIsOpen(false)
        refreshPage()
    }

    return (
        <div>
            <PlainHeader></PlainHeader>

            <div className="feeds-page">
                <div className="list-container">
                    <NavLink className="feed-links" to="/fresh-posts">Fresh</NavLink>
                    <NavLink className="feed-links" to="/friends-posts">Following</NavLink>
                    <NavLink className="feed-links" to="/popular-posts">Popular</NavLink>
                </div>

                <div id="fix-container">
                    <button id="btn-create-post" onClick={() => setIsOpen(true)}><i className="fa-solid fa-plus post-icon-white"></i></button>
                </div>

                {isOpen &&
                    <ModalModule
                        setIsOpen={setIsOpen}
                        modalHeadline={"Create a Post"}>
                        <CreatePostForm closeModalHandler={closeModal} />
                    </ModalModule>
                }

                <div className="feed-container">
                    {props.children}
                </div>
            </div>
            <NavMenue></NavMenue>
        </div>
    )
}