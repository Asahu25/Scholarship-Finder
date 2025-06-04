import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from "./components/navBar";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Favourites from "./Pages/Favourites";
import ScholarshipHome from "./Pages/ScholarshipIndex";
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
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
      </Routes>
    </Router>
  );
}
