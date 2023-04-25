import React from 'react';

export default function ProductItem(props) {
    return (
        <div key={props.prod.id} className={'card mb-2 shadow-sm border-'}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">
                        <span className="badge bg-secondary rounded-pill text-bg-primary me-1">
                            {props.prod.id}
                        </span>
                        - {props.prod.name}
                    </h5>
                </div>
                <p className="card-text">{props.prod.description}</p>
                <div className="d-flex justify-content-end pt-2 m-0 border-top">
                    <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => props.getProduct(props.prod.id)}
                    >
                        <i className="fas fa-pen"></i> Editar
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => props.handleConfirmModal(props.prod.id)}
                    >
                        <i className="fas fa-trash"></i> Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}
