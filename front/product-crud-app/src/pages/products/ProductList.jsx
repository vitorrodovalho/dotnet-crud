import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

export default function ProductList(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = props.products.filter((product) => {
        return Object.values(product)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <InputGroup className="mt-3 mb-3">
                <InputGroup.Text>Buscar:</InputGroup.Text>
                <FormControl
                    onChange={handleInputChange}
                    placeholder="Buscar pelo nome do produto"
                />
            </InputGroup>
            <table className="table table-striped table-hover">
                <thead className="table-dark mt-3">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Fornecedor</th>
                        <th scope="col">Data Criação</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category.name}</td>
                            <td>{product.supplier.name}</td>
                            <td>{product.createdAt}</td>
                            <td>
                                <div>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() =>
                                            props.getProduct(product.id)
                                        }
                                    >
                                        <i className="fas fa-pen"></i> Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                            props.handleConfirmModal(product.id)
                                        }
                                    >
                                        <i className="fas fa-trash"></i> Deletar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
