import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home';
import FormPage from './pages/formPage';
import DetailPage from './pages/detailPage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router futureFlags={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novo" element={<FormPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;