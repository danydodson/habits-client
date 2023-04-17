import React from 'react'
import EditProfileHeader from '../../components/profile/EditProfileHeader'
import EditProfileForm from '../../components/profile/EditProfileForm'
import NavMenue from '../../components/navigation/NavMenue'


export default function EditProfile() {

	return (
		<div className="page-relative">
			<EditProfileHeader
				profileHeadline="Edit Profile"
				profileSubheadline="Change Image"
			/>
			<EditProfileForm></EditProfileForm>
			<NavMenue></NavMenue>
		</div>

	)
}