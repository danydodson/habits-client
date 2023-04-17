import React from 'react'
import './ProfileComponents.css'
import defaultUser from '../../assets/images/default-user-placeholder.png'

export default function ProfileHeader(props) {

    const {profileHeadline, profileSubheadline, userImage} = props

    return (
        <section id="profile-header">
            <div className="flex-header">
                <div className="profile-img-container-lg">
                    {userImage? (<img className="profile-img-lg" src={userImage} alt="default-user"/>):(<img className="profile-img-lg" src={defaultUser} alt="default-user"/>)}
                </div>
                <div>
                    <p className="profile-headline" >@ {profileHeadline}</p>
                    <p className="profile-subheadline" >{profileSubheadline}</p> 
                </div>
                <div>
                    {props.children}
            </div>
            </div>
            <div className="curved corner-t-right cc-profile-header"></div>
        </section>
    )
}   