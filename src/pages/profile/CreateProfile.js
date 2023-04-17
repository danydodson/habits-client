import React from 'react'
import EditProfileHeader from '../../components/profile/EditProfileHeader'
import CreateProfileForm from '../../components/profile/CreateProfileForm'
import image from '../../assets/images/2.png'




export default function CreateProfile() {

  return (
    <div className="page-relative">
      <EditProfileHeader
        profileHeadline="Welcome"
        profileSubheadline="Upload Image"
      />

      <div id="img-container">
        <img id="img-create-profile" src={image} alt="create profile" />
      </div>

      <CreateProfileForm />
    </div>

  )
}