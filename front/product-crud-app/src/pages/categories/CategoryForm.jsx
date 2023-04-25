import React, { Component } from 'react';
import { useEffect, useState } from 'react';

const categoryDefault = {
    id: 0,
    name: '',
    masterCategoryId: '',
};

export default function CategoryForm(props) {
    const [category, setCategory] = useState(currentCategory());

    useEffect(() => {
        if (props.catSelected !== 0) setCategory(props.catSelected);
    }, [props.catSelected]);

    const inputTextHandler = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    function currentCategory() {
        if (props.catSelected.id !== 0) {
            return props.catSelected;
        } else {
            return categoryDefault;
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.cancelCategory();
        setCategory(categoryDefault);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (props.catSelected.id !== 0) {
            props.updateCategory(category);
        } else {
            props.addCategory(category);
        }

        setCategory(categoryDefault);
    };

    console.log(props.categories);

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
                        value={category.name}
                    />
                </div>

                <div className="col-md-12">
                    <label className="form-label">Categoria</label>
                    <select
                        name="masterCategoryId"
                        id="masterCategoryId"
                        className="form-select"
                        onChange={inputTextHandler}
                        value={category.masterCategoryId}
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
                    <hr />
                </div>

                <div className="col-12 mt-0">
                    {category.id === 0 ? (
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
