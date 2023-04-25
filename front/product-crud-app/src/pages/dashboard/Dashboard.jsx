import React from 'react';
import TitlePage from '../../components/TitlePage';
import { Card, Row, Col } from 'react-bootstrap';

export default function Dashboard() {
    return (
        <>
            <TitlePage title="Dashboard" />
            <div className="mt-3">
                <Row>
                    <Col>
                        <Card border="success">
                            <Card.Header>Produtos</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className="text-center">25</h1>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="secondary">
                            <Card.Header bg={'danger'}>Categorias</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className="text-center">256</h1>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="warning">
                            <Card.Header>Fornecedores</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className="text-center">25</h1>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="danger">
                            <Card.Header>Usuários</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className="text-center">2</h1>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
