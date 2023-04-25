import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });

            // Armazena o token JWT no armazenamento local do navegador
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error(error);
            alert('E-mail ou senha inválidos.');
        }
    };

    return (
        <div>
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
}
