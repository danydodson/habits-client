import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './context/AuthContext'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <Router>
      <AuthProviderWrapper>
         <App />
      </AuthProviderWrapper>
   </Router>
)
