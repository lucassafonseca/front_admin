// src/components/MainLayout.js
import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import './MainLayout.css'; // Importando os estilos do layout

function MainLayout() {
  return (
    <div className="layout-container">
      <Header />
      <Navbar />
      <main className="main-content">
        <Outlet /> {/* Renderiza os componentes filhos aqui */}
      </main>
    </div>
  );
}

export default MainLayout;
