import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from "./components/navBar";
import LoginPage from "./Pages/LoginPage";
import Favourites from "./Pages/Favourites";
import ScholarshipHome from "./Pages/ScholarshipIndex";
import ProfilePage from './Pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <ScholarshipHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/favourites" 
          element={
            <ProtectedRoute>
              <Favourites />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
