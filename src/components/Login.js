// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css'; // Importando o arquivo CSS

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');

  // Obtém a rota de origem, se existir
  const from = location.state?.from?.pathname || '/home';

  const handleLogin = (e) => {
    e.preventDefault();

    // Lógica de autenticação de exemplo
    if (username === 'admin' && password === 'senha123') {
      localStorage.setItem('authToken', 'token-de-exemplo');
      navigate(from, { replace: true }); // Redireciona para a rota de origem
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>Usuário:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
}

export default Login;
