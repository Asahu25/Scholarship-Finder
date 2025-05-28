import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="520259419382-2c3cnrp25nen87hgioi1ojhob6ajvtg3.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
