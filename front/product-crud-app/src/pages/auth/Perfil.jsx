import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Span } from 'react-bootstrap';
import api from '../../api/default';

export default function Perfil() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Row className="justify-content-md-center mt-3">
                <Col xs={5}>
                    <h1 className="m-0 p-0 text-center">Perfil</h1>
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
        </>
    );
}
