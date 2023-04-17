import React from 'react'
import { Link } from 'react-router-dom'
import habitusLogo from '../../assets/images/habitus-logo.png'
import image from '../../assets/images/404-page.png'

export default function Onboarding() {

    return (
        <div className="homepage-section">
            <img className="img-logo" src={habitusLogo} alt="women gathering img" />
            <p>"If you want to go fast, go alone. <br></br> If you want to go far, go together."</p>

            <img id="img-onboarding" src={image} alt="" />
            <Link className="link-blue-lg" to="/create-profile">Continue</Link>
        </div>
    )
}