import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

const client_id = "744755241535-1mtvonchsmf3ojivm2a6ah0tti47vcji.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  
  
  <StrictMode>
    <GoogleOAuthProvider clientId={client_id}>
    <BrowserRouter>
    {/* <ProtectedRoute> */}
    <App />
    {/* </ProtectedRoute> */}
    </BrowserRouter>
    
    </GoogleOAuthProvider>
  </StrictMode>
)
