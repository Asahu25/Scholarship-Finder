import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from "./components/navBar"
import {
  BrowserRouter as Router, 
  Routes, 
  Route
}from "react-router-dom";
import LoginPage from "./Pages/LoginPage"
import Favourites from "./Pages/Favourites"
import ScholarshipIndex from "./Pages/ScholarshipIndex"
import ScholarshipHome from './Pages/ScholarshipIndex';

export default function App(){
  return(
    <Router>
      <NavBar />
      <Routes>
        <Route exact path = "/home" element  = {<ScholarshipHome />} />
        <Route exact path = "/login" element = {<LoginPage />} />
        <Route exact path = "/favourites" element = {<Favourites />} />
      </Routes>
    </Router>
  );
}