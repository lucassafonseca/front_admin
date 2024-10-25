// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Importando o ícone de logout do Font Awesome
import './Header.css'; // Importando o arquivo CSS do Header

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o token de autenticação do localStorage
    localStorage.removeItem('authToken');

    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <header className="header">
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt className="icon" /> Logout
      </button>
    </header>
  );
}

export default Header;
