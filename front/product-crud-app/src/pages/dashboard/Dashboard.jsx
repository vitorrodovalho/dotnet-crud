import React, { useEffect, useState } from 'react';
import TitlePage from '../../components/TitlePage';
import { Card, Row, Col } from 'react-bootstrap';
import api from '../../api/default';

export default function Dashboard() {
    const [productCount, setProductCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [supplierCount, setSupplierCount] = useState(0);

    useEffect(() => {
        // Obter número de produtos
        api.get('/product')
            .then((res) => setProductCount(res.data.length))
            .catch((err) => console.log(err));

        // Obter número de categorias
        api.get('/category')
            .then((res) => setCategoryCount(res.data.length))
            .catch((err) => console.log(err));

        // Obter número de fornecedores
        api.get('/supplier')
            .then((res) => setSupplierCount(res.data.length))
            .catch((err) => console.log(err));
    }, []);

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
                                    <h1 className="text-center">
                                        {productCount}
                                    </h1>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="secondary">
                            <Card.Header bg={'danger'}>Categorias</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className="text-center">
                                        {categoryCount}
                                    </h1>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="warning">
                            <Card.Header>Fornecedores</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className="text-center">
                                        {supplierCount}
                                    </h1>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
