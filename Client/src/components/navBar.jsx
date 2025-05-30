import "../Styles/navBar.css";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/HomePageLogo.png"

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

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
                        className="navbar-logo-img">
                    </img>
                </button>
                <button
                    className={`navbar-button ${isActive("/favourites") ? "active" : ""}`}
                    onClick={() => navigate("/favourites")}
                >
                    Favourites
                </button>
            </div>
            <div className="navbar-right">
                <button
                    className={`navbar-button ${isActive("/login") ? "active" : ""}`}
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
            </div>
        </nav>
    );
}