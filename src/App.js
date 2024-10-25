// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importando seus componentes
import Login from './components/Login';
import Home from './components/Home';
import Pedidos from './components/Pedidos';
import Itens from './components/Itens';
import Produtos from './components/Produtos';
import Categorias from './components/Categorias';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout'; // Importando o MainLayout

function App() {
  return (
    <Routes>
      {/* Rota para a página de login */}
      <Route path="/login" element={<Login />} />

      {/* Rota principal que usa o MainLayout */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Rotas protegidas */}
        <Route path="home" element={<Home />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="itens" element={<Itens />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="categorias" element={<Categorias />} />

        {/* Rota padrão dentro do MainLayout */}
        <Route index element={<Navigate to="/home" replace />} />
      </Route>

      {/* Rota padrão fora das rotas protegidas */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
