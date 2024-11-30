import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import DiaryPage from '../pages/DiaryPage/DiaryPage';
import AddProductPage from '../pages/AddProductPage/AddProductPage';
import Calculator from '../pages/Calculator/Calculator';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/diary" element={<DiaryPage />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/add-product" element={<AddProductPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;