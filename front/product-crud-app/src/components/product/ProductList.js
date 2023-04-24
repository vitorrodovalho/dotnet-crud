import React from 'react';
import ProductItem from './ProductItem';

export default function ProductList(props) {
    return (
        <div className="mt-3">
            {props.products.map((prod) => (
                <ProductItem
                    prod={prod}
                    handleConfirmModal={props.handleConfirmModal}
                    getProduct={props.getProduct}
                />
            ))}
        </div>
    );
}
