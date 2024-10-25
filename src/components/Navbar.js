// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaBoxOpen, FaTags, FaList } from 'react-icons/fa'; // Importando os ícones do Font Awesome
import './Navbar.css'; // Importando o arquivo CSS do Navbar

function Navbar() {
  return (
    <nav className="sidebar">
      <ul className="nav-menu">
        <li>
          <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaHome className="icon" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/pedidos" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaShoppingCart className="icon" /> Pedidos
          </NavLink>
        </li>
        <li>
          <NavLink to="/itens" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaBoxOpen className="icon" /> Itens
          </NavLink>
        </li>
        <li>
          <NavLink to="/produtos" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaTags className="icon" /> Produtos
          </NavLink>
        </li>
        <li>
          <NavLink to="/categorias" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaList className="icon" /> Categorias
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
