import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from "./components/navBar"
import {
  BrowserRouter as Router, 
  Routes, 
  Route
}from "react-router-dom";

import StudentProfileForm from "./Pages/StudentProfileForm"
import ScholarshipIndex from "./Pages/ScholarshipIndex"

export default function App(){
  return(
    <Router>
      <NavBar />
      <Routes>
        <Route exact path = "/home" element  = {<ScholarshipIndex />} />
        {/* <Route exact path = "/login" element = {<LoginPage />} />
        <Route exact path = "/favourites" element = {<Favourites />} /> */}
      </Routes>
    </Router>
  );
}