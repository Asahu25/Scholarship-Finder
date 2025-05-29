import "../Styles/navBar.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button
                    className={`navbar-button ${isActive("/home") ? "active" : ""}`}
                    onClick={() => navigate("/home")}
                >
                    Home
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