import React, { useState, useEffect } from 'react'
import './ProfileComponents.css'
import defaultUser from '../../assets/images/default-user-placeholder.png'
import axios from 'axios'
import ModalModule from '../common/ModalModule'

const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/my-profile`;

export default function EditProfileHeader(props) {

    const storedToken = localStorage.getItem('authToken')

    const {profileHeadline, profileSubheadline} = props
    const [ profileImg, setProfileImage ] = useState("")

    const [isOpen, setIsOpen] = useState(false)

    useEffect( () => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");

            try {
                const userData = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
                setProfileImage(userData.data.profileImg)
            } catch (err) {
                console.log(err)
            }
            setIsOpen(false)
        } 
    apiCall()
    }, [])


    const handleFileUpload = async (event) => {
     
        const uploadData = new FormData();
        uploadData.append("image", event.target.files[0]);

        try {
            const fileDate = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, {headers: {Authorization: `Bearer ${storedToken}`}})
            setProfileImage (fileDate.data.fileUrl)
        } catch (err) {
            console.log(err)
        }   
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/my-profile/edit`, {profileImg: profileImg}, {headers: {Authorization: `Bearer ${storedToken}`}})

        } catch (err) {
            console.log(err)
        }
        setIsOpen(false)
    } 

    return (
        <section id="edit-profile-header">
        <div className="curved corner-t-right cc-navbar"></div>
            <div className="flex-header">
                <div className="profile-img-container-lg">
                    {profileImg? (<img className="profile-img-lg" src={profileImg} alt="user"/>):(<img className="profile-img-lg" src={defaultUser} alt="default-user"/>)}
                </div>
                <div>
                    <p className="profile-headline" >{profileHeadline}</p>
                    <button className="profile-subheadline" onClick={() => setIsOpen(true)}>{profileSubheadline} <i className="fa-solid fa-arrow-up-from-bracket"></i></button>
                </div>
            </div>
            {isOpen && 
            <ModalModule
            setIsOpen={setIsOpen}
            modalHeadline={"Image-Uploade"}>
                <form className="form" onSubmit={submitHandler}>
                    <div className="media-upload-container">
                        <label className="label-subtitle">Choose an Image:</label>
                        <input type="file" name="image" onChange={(event) => handleFileUpload(event)} />            
                    </div>
                    <button type='submit' className="button-blue-lg">Chose this Image</button>
                </form>
            </ModalModule>
            }
        </section>
    )
}