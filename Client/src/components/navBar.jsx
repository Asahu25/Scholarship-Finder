import "../Styles/navBar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/HomePageLogo.png"
import { logout } from "../services/scholarItemServices";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const email = sessionStorage.getItem('userEmail');
        setIsAuthenticated(email !== null);
        setUserEmail(email);
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await logout();
            setIsAuthenticated(false);
            setUserEmail(null);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            sessionStorage.clear();
            setIsAuthenticated(false);
            setUserEmail(null);
            navigate('/login');
        }
    };

    if (!isAuthenticated && location.pathname !== '/login') {
        return (
            <nav className="navbar">
                <div className="navbar-left">
                    <img
                        src={logo}
                        alt="Scholar Compass"
                        className="navbar-logo-img"
                    />
                </div>
                <div className="navbar-right">
                    <button
                        className="navbar-button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </div>
            </nav>
        );
    }
    if (location.pathname === '/login') {
        return (
            <nav className="navbar">
                <div className="navbar-left">
                    <img
                        src={logo}
                        alt="Scholar Compass"
                        className="navbar-logo-img"
                    />
                </div>
            </nav>
        );
    }
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button
                    className="navbar-logo-button"
                    onClick={() => navigate("/home")}
                >
                    <img
                        src={logo}
                        alt="Scholar Compass"
                        className="navbar-logo-img"
                    />
                </button>
                <button
                    className={`navbar-button ${location.pathname === "/favourites" ? "active" : ""}`}
                    onClick={() => navigate("/favourites")}
                >
                    Favourites
                </button>
            </div>
            <div className="navbar-right">
                {userEmail && <span className="user-email">{userEmail}</span>}
                <button
                    className={`navbar-button ${location.pathname === "/profile" ? "active" : ""}`}
                    onClick={() => navigate("/profile")}
                >
                    Profile
                </button>
                <button
                    className="navbar-button logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}