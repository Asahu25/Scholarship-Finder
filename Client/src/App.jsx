import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navigate} from 'react-router-dom';

import NavBar from "./components/navBar";
import LoginPage from "./Pages/LoginPage";
import Favourites from "./Pages/Favourites";
import ScholarshipHome from "./Pages/ScholarshipIndex";
import ProfilePage from './Pages/Profile';

export default function App() {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (scholarship) => {
    setFavourites((prev) => {
      if (!prev.some(item => item.id === scholarship.id)) {
        return [...prev, scholarship];
      }
      return prev;
    });
  };

  const removeFromFavourites = (id) => {
    setFavourites((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={ <Navigate to="/home" /> }/>
          <Route
            path="/home"
            element={
              <ScholarshipHome
                addToFavourites={addToFavourites}
                removeFromFavourites={removeFromFavourites}
                favouriteList={favourites} />}
          />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favourites"
          element={
            <Favourites
              favourites={favourites}
              removeFromFavourites={removeFromFavourites}
            />
          }
        />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
}
