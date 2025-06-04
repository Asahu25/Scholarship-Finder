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
        // Check authentication status whenever location changes
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
            // Still clear local state and redirect even if server logout fails
            sessionStorage.clear();
            setIsAuthenticated(false);
            setUserEmail(null);
            navigate('/login');
        }
    };

    // If not authenticated and not on login page, show minimal navbar
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

    // If on login page, show only logo
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

    // Full navbar for authenticated users
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
                    className="navbar-button logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}