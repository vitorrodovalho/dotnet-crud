import React, { Component } from 'react';
import { useEffect, useState } from 'react';

const supplierDefault = {
    id: 0,
    name: '',
};

export default function SupplierForm(props) {
    const [supplier, setSupplier] = useState(currentSupplier());

    useEffect(() => {
        if (props.supSelected !== 0) setSupplier(props.supSelected);
    }, [props.supSelected]);

    const inputTextHandler = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    function currentSupplier() {
        if (props.supSelected.id !== 0) {
            return props.supSelected;
        } else {
            return supplierDefault;
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.cancelSupplier();
        setSupplier(supplierDefault);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (props.supSelected.id !== 0) {
            props.updateSupplier(supplier);
        } else {
            props.addSupplier(supplier);
        }

        setSupplier(supplierDefault);
    };

    return (
        <>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <label className="form-label">Nome</label>
                    <input
                        name="name"
                        type="text"
                        onChange={inputTextHandler}
                        className="form-control"
                        id="name"
                        value={supplier.name}
                    />
                    <hr />
                </div>

                <div className="col-12 m-0">
                    {supplier.id === 0 ? (
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
