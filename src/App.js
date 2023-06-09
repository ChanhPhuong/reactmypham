import logo from './logo.svg';
import './App.scss';
import Header from './components/Header';

import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import ModalAddNew from './components/ModalAddNew';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route, Link } from 'react-router-dom';

import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import ViewHome from './Views/ViewHome';

function App() {
  const { user, loginContext } = useContext(UserContext);
  console.log(">>> user:", user)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"))
    }
  }, [])

  return (
    <>
      <div className='app-container'>

        <Container>

          <Header />
          <Container>
            <AppRoutes />


          </Container>
        </Container>


      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;
