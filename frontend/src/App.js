import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';
import React from 'react';

const App = () => {
  return (
    <>
      <Helmet>
        <title>My Shop | Best Online Store</title>
        <meta name="description" content="Best online shop for electronics and more!" />
        <meta name="keywords" content="electronics, buy electronics, cheap electronics" />
      </Helmet>

      <ToastContainer />
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
