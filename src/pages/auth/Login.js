import axios from 'axios'
import React, { useState, useContext } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import Navbar from '../../components/navigation/Navbar'

export default function Login() {
   const { storeToken, authenticateUser } = useContext(AuthContext)
   const [user, setUser] = useState({
      email: '',
      password: ''
   })
   const [errorMessage, setErrorMessage] = useState(undefined)
   const navigate = useNavigate()

   const handleChange = (e) => {
      setUser(prev => {
         return {
            ...prev,
            [e.target.name]: e.target.value
         }
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, user)
         toast.success('Welcome back!')
         storeToken(response.data.authToken)
         authenticateUser()
         navigate('/profile')

      } catch (error) {
         setErrorMessage(error.response.data.error)
      }
   }

   return (
      <div >
         <Navbar></Navbar>
         <section id="login">
            <form className="form" onSubmit={handleSubmit}>
               <div className="form-row">
                  <label>Email</label>
                  <input required type="email" name="email" placeholder="balance@gmail.com" value={user.email} onChange={handleChange} />
               </div>
               <div className="form-row">
                  <label>Password</label>
                  <input required type="password" name="password" placeholder="******" value={user.password} onChange={handleChange} />
               </div>
               {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
               <button className="button-blue-xl" type="submit">Log in </button>
            </form>
            <p className="text-centered">No Account yet? Go to <Link className="link-blue" to="/signup">SIGN UP</Link></p>
         </section>
      </div>
   )
}
