import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await axios.post('/api/auth/register', {
                name,
                email,
                password,
            });

            // Redireciona o usuário para a página de login
            //history.push('/login');
        } catch (error) {
            console.error(error);
            alert('Erro ao criar a conta.');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <button onClick={handleRegister}>Criar conta</button>
        </div>
    );
}
