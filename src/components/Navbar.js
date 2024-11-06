// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaBoxOpen, FaTags, FaList } from 'react-icons/fa'; // Importando os ícones do Font Awesome
import './Navbar.css'; // Importando o arquivo CSS do Navbar

function Navbar({ unattendedCount }) {
  const [newOrders, setNewOrders] = useState(unattendedCount);

  // Atualiza o contador de pedidos não atendidos (se necessário)
  useEffect(() => {
    setNewOrders(unattendedCount);
  }, [unattendedCount]);

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
            <div className="pedido-container">
              <FaShoppingCart className="icon" /> Pedidos
              {newOrders > 0 && (
                <div className="pedido-badge">{newOrders}</div> // Badge que exibe o contador de pedidos não atendidos
              )}
            </div>
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
