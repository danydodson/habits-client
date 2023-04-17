import React from 'react'
import Navbar from '../components/navigation/Navbar'
import image from '../assets/images/404-page.png'
import habitusLogo from '../assets/images/habitus-logo.png'

export default function ErrorPage() {
   return (
      <div >
         <Navbar></Navbar>
         <div className="homepage-section">
            <h1 className="error-headline">Page not Found!</h1>
            <img id="img-women-gathering" src={image} alt="women working img" />
            <p id="error-quote"> - You might be on the wrong Path here, but HABITUS will help you to find the rigth Direction in your Life - </p>
            <img className="error-logo" src={habitusLogo} alt="women gathering img" />
         </div>
      </div>

   )
}
