import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; 
import App from './components/App';
import Course from './components/Course';
import Instructor from './components/Instructor';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lesson from './components/Lesson';
import NewCourse from './components/NewCourse';
import Login from './components/Login';
import Register from './components/Register';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/course' element={<Course />}></Route>
      <Route path='/instructor' element={<Instructor />}></Route>
      <Route path='/lesson' element={<Lesson />}></Route>
      <Route path='/newcourse' element={<NewCourse />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
