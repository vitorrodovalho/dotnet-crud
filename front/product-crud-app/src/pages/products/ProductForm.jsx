import React, { Component } from 'react';
import { useEffect, useState } from 'react';

const productDefault = {
    id: 0,
    name: '',
    categoryId: 0,
    supplierId: 0,
    description: '',
    createdAt: '',
};

export default function ProductForm(props) {
    const [product, setProduct] = useState(currentProduct());

    useEffect(() => {
        if (props.prodSelected !== 0) setProduct(props.prodSelected);
    }, [props.prodSelected]);

    const inputTextHandler = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    function currentProduct() {
        if (props.prodSelected.id !== 0) {
            return props.prodSelected;
        } else {
            return productDefault;
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.cancelProduct();
        setProduct(productDefault);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (props.prodSelected.id !== 0) {
            props.updateProduct(product);
        } else {
            props.addProduct(product);
        }

        setProduct(productDefault);
    };

    return (
        <>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label className="form-label">Nome</label>
                    <input
                        name="name"
                        type="text"
                        onChange={inputTextHandler}
                        className="form-control"
                        id="name"
                        value={product.name}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Categoria</label>
                    <select
                        name="categoryId"
                        id="categoryId"
                        className="form-select"
                        onChange={inputTextHandler}
                        value={product.categoryId}
                    >
                        <option value="NaoDefinido" selected>
                            Selecionar ...
                        </option>
                        {props.categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-12">
                    <label className="form-label">Fornecedor</label>
                    <select
                        name="supplierId"
                        id="supplierId"
                        className="form-select"
                        onChange={inputTextHandler}
                        value={product.supplierId}
                    >
                        <option value="NaoDefinido" selected>
                            Selecionar ...
                        </option>
                        {props.suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-12 mt-2">
                    <label className="form-label">Descricao</label>
                    <textarea
                        name="description"
                        type="text"
                        onChange={inputTextHandler}
                        className="form-control"
                        id="description"
                        value={product.description}
                    />
                    <hr />
                </div>

                <div className="col-12 mt-0">
                    {product.id === 0 ? (
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                        >
                            <i className="fas fa-plus me-2"></i>
                            Salvar
                        </button>
                    ) : (
                        <>
                            <button
                                className="btn btn-outline-success me-2"
                                type="submit"
                            >
                                <i className="fas fa-plus me-2"></i>
                                Salvar
                            </button>
                            <button
                                className="btn btn-outline-warning"
                                onClick={handleCancel}
                            >
                                <i className="fas fa-ban me-2"></i>
                                Cancelar
                            </button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
}
