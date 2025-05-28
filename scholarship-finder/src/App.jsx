import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react'
import StudentProfileForm from "./Pages/StudentProfileForm"
import LoginPage from './Pages/LoginPage';
import GoogleButton from './components/GoogleButton';
import './App.css'

export default function App(){
  const [count, setCount] = useState(0)

  return(
    <div>
      <LoginPage/>
    </div>
  );
}