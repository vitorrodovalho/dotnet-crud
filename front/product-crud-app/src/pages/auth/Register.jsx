import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Span } from 'react-bootstrap';
import api from '../../api/default';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password,
            });

            if (response.status === 200) {
                alert('Usuário cadastrado com sucesso');
                // Redireciona o usuário para a página de login
                window.location.href = '/login';
            } else alert('Erro ao criar a conta.');
        } catch (error) {
            alert('Erro ao criar a conta.');
        }
    };

    return (
        <>
            <Row className="justify-content-md-center mt-3">
                <Col md={5}>
                    <h1 className="m-0 p-0 text-center">Cadastrar-se</h1>
                    <Form>
                        <Form.Group controlId="formBasicEmail" className="mt-2">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="nome"
                                placeholder="Nome"
                                value={name}
                                required={true}
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
                                value={email}
                                required={true}
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
                                required={true}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button
                                variant="primary"
                                type="submit"
                                className="mt-2"
                                onClick={handleRegister}
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
        </>
    );
}
