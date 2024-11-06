// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { notification } from 'antd';
import { BellOutlined } from '@ant-design/icons';

// Importando seus componentes
import Login from './components/Login';
import Home from './components/Home';
import Pedidos from './components/Pedidos';
import Itens from './components/Itens';
import Produtos from './components/Produtos';
import Categorias from './components/Categorias';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';

function App() {
  const [unattendedCount, setUnattendedCount] = useState(0);

  // Função para exibir uma notificação de novo pedido
  const openNotification = () => {
    notification.open({
      message: 'Novo Pedido Recebido!',
      description: 'Um novo pedido chegou e está aguardando atendimento.',
      icon: <BellOutlined style={{ color: '#108ee9' }} />,
    });
  };

  // Função chamada quando há um novo pedido
  const handleNewOrder = () => {
    setUnattendedCount((prevCount) => prevCount + 1);
    openNotification();
  };

  // Função para redefinir o contador ao processar os pedidos
  const resetUnattendedCount = () => {
    setUnattendedCount(0);
  };

  return (
    <Routes>
      {/* Rota para a página de login */}
      <Route path="/login" element={<Login />} />

      {/* Rota principal que usa o ProtectedRoute */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout unattendedCount={unattendedCount} />
          </ProtectedRoute>
        }
      >
        {/* Rotas protegidas dentro do MainLayout */}
        <Route path="home" element={<Home />} />
        <Route 
          path="pedidos" 
          element={
            <Pedidos onNewOrder={handleNewOrder} resetUnattendedCount={resetUnattendedCount} />
          } 
        />
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
