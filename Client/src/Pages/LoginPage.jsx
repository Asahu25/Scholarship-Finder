import { useState } from 'react'
import '../Styles/LoginPage.css'
import user_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import email_icon from '../assets/email.png';
import family from '../assets/family.jpg';
import GoogleButton from '../components/GoogleButton'
import Loader from '../components/CircularLoader';
import { signUp, getUser } from '../services/scholarItemServices';

const handleSubmit = async (e, action, setError) => {
  e.preventDefault();
  let arr;
  if(action==="Sign Up"){
    arr = [e.target[0].value, e.target[1].value, e.target[2].value];
    const response = await signUp(arr[0], arr[1], arr[2]);
    if(response instanceof Error) {
      setError("Email already exists. Please choose a different  email.");
    } else {
      setError("");
      // Handle successful signup here
    }
  }else{
    arr = [e.target[0].value, e.target[1].value];
    const response = await getUser(arr[0], arr[1]);
    if(response instanceof Error) {
      setError("Email does not exist. Please choose a different email / Please Sign Up.");
    } else {
      setError("");
    }
  }
}

function LoginPage() {
  const [action, setAction] = useState("Login")
  const [error, setError] = useState("")
  console.log(action);
  return (
    <div className="main-container">
      <div className="login-panel">
        <div className="container">
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={(e) => handleSubmit(e, action, setError)}>
                <div className="inputs">
                  {action !== "Login" && (
                    <div className="input">
                      <img src={user_icon} alt="user" />
                      <input type="text" placeholder="Name" />
                    </div>
                  )}
                  <div className="input">
                    <img src={email_icon} alt="email" />
                    <input type="email" placeholder="Email" />
                  </div>
                  <div className="input">
                    <img src={password_icon} alt="password" />
                    <input type="password" placeholder="Password" />
                  </div>
                </div>

                {action === "Sign Up" ? (
                  <div
                    className="forgot-password"
                    onClick={() => setAction("Login")}
                  >
                    Already have an account? <span>Login</span>
                  </div>
                ) : (
                  <div
                    className="forgot-password"
                    onClick={() => setAction("Sign Up")}>
                    Create a new account? <span>Sign Up</span>
                  </div>
                )}

                {/* submit-container now centers its children */}
                <div className="submit-container">
                  <div className="sub">
                    <input type = "submit" value = {action} ></input>
                  </div>
                </div>
            </form>
          {action === "Login" && (
            <>
              <div className="divider"><span>or</span></div>
              <div className="googleButton">
                <GoogleButton />
              </div>
            </>
          )}
        </div>
      </div>

      {/* right panel: image + translucent overlay + overlay text */}
      <div className="image-panel">
        <img
          src={family}
          alt="decorative"
          className="side-image"
        />
        <div className="gradient-overlay" />
        <div className="overlay-text">Welcome to Scholar Compass!</div>
      </div>

      {/* <div>
        <Loader></Loader>
      </div> */}
    </div>

  )
}

export default LoginPage