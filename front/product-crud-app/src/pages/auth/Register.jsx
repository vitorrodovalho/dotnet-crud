import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Span } from 'react-bootstrap';
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
        <>
            <Row className="justify-content-md-center mt-3">
                <Col xs={5}>
                    <h1 className="m-0 p-0 text-center">Cadastrar-se</h1>
                    <Form>
                        <Form.Group controlId="formBasicEmail" className="mt-2">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="nome"
                                placeholder="Nome"
                                value={email}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="formBasicPassword"
                            className="mt-2"
                        >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={password}
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
                                placeholder="Senha"
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
                                Cadastrar-se
                            </Button>
                        </div>
                    </Form>
                    <div className="text-center mt-4">
                        <span>
                            Já possui uma conta? <a href="/login">Login</a>
                        </span>
                    </div>
                </Col>
            </Row>
            {/*<div>
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
        </div>*/}
        </>
    );
}
