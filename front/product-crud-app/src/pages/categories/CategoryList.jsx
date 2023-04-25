import React from 'react';
import { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

export default function CategoryList(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCategories = props.categories.filter((category) => {
        return Object.values(category)
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
                    placeholder="Buscar pelo nome da categoria"
                />
            </InputGroup>
            <table className="table table-striped table-hover">
                <thead className="table-dark mt-3">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <div>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() =>
                                            props.getSupplier(category.id)
                                        }
                                    >
                                        <i className="fas fa-pen"></i> Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                            props.handleConfirmModal(
                                                category.id
                                            )
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
