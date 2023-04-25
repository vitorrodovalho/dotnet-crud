import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Span } from 'react-bootstrap';
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
        <>
            <Row className="justify-content-md-center mt-3">
                <Col xs={5}>
                    <h1 className="m-0 p-0 text-center">Login</h1>
                    <Form>
                        <Form.Group controlId="formBasicEmail" className="mt-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Insira o email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="formBasicPassword"
                            className="mt-2"
                        >
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Insira a senha"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button
                                variant="primary"
                                type="submit"
                                className="mt-2"
                            >
                                Entrar
                            </Button>
                        </div>
                    </Form>
                    <div className="text-center mt-4">
                        <span>
                            Não possuí um Login?{' '}
                            <a href="/registration">Cadastrar-se</a>
                        </span>
                    </div>
                </Col>
            </Row>
            {/*
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
            */}
        </>
    );
}
