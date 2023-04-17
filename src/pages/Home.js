import './Home.css'
import habitusLogo from '../assets/images/habitus-logo.png'
import { Link } from 'react-router-dom'


export default function Home() {

   return (
      <div className="homepage-section">
         <img className="img-logo" src={habitusLogo} alt="women gathering img" />
         <Link className="link-blue-lg" to="/signup">Sign up</Link>
         <Link className="link-brown-lg" to="/login">Login</Link>
         <img id="img-women-gathering" src={require('../assets/images/women-gathering.png')} alt="women gathering img" />
      </div>
   )
}





