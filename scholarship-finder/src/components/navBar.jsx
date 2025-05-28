import "../Styles/navBar.css";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button className="navbar-button" onClick={() => navigate("/home")}>Home</button>
                <button className="navbar-button" onClick={() => navigate("/favourites")}>Favourites</button>
            </div>
            <div className="navbar-right">
                <button className="navbar-button" onClick={() => navigate("/login")}>Login</button>
            </div>
        </nav>
    );
}