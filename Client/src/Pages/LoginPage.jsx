import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css'
import user_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import email_icon from '../assets/email.png';
import family from '../assets/family.jpg';
import GoogleButton from '../components/GoogleButton'
import { signUp, getUser } from '../services/scholarItemServices';

function LoginPage() {
  const [action, setAction] = useState("Login");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      navigate('/home');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      if (action === "Sign Up") {
        try {
          const response = await signUp(formData.username, formData.email, formData.password);
          sessionStorage.setItem('userEmail', formData.email);
          navigate('/home');
        } catch (error) {
          setError(error.message || "Email already exists. Please choose a different email.");
        }
      } else {
        try {
          const response = await getUser(formData.email, formData.password);
          sessionStorage.setItem('userEmail', formData.email);
          navigate('/home');
        } catch (error) {
          setError(error.message || "Invalid email or password.");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="main-container">
      <div className="login-panel">
        <div className="container">
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              {action === "Sign Up" && (
                <div className="input">
                  <img src={user_icon} alt="user" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Name"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              <div className="input">
                <img src={email_icon} alt="email" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input">
                <img src={password_icon} alt="password" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {action === "Sign Up" ? (
              <div
                className="forgot-password"
                onClick={() => {
                  setAction("Login");
                  setError("");
                  setFormData({ username: '', email: '', password: '' });
                }}
              >
                Already have an account? <span>Login</span>
              </div>
            ) : (
              <div
                className="forgot-password"
                onClick={() => {
                  setAction("Sign Up");
                  setError("");
                  setFormData({ username: '', email: '', password: '' });
                }}
              >
                Create a new account? <span>Sign Up</span>
              </div>
            )}

            <div className="submit-container">
              <div className="sub">
                <input type="submit" value={action} />
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
  );
}

export default LoginPage;