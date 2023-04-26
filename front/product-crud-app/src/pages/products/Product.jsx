import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalFooter,
    InputGroup,
    FormControl,
} from 'react-bootstrap';
import api from '../../api/default';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProductModal: false,
            smShowConfirmModal: false,
            products: [],
            product: { id: 0 },
            categories: [],
            suppliers: [],
        };
    }

    handleProductModal = () => {
        if (this.state.showProductModal)
            this.setState({ product: { id: 0 }, showProductModal: false });
        else this.setState({ showProductModal: !this.state.showProductModal });
    };

    handleConfirmModal = (id) => {
        const { products } = this.state;
        if (id !== 0 && id !== undefined) {
            const product = products.filter((product) => product.id === id);
            this.setState({ product: product[0] });
        } else {
            this.setState({ product: { id: 0 } });
        }
        this.setState({ smShowConfirmModal: !this.state.smShowConfirmModal });
    };

    getAllProducts = async () => {
        const response = await api.get('product');
        return response.data;
    };

    getAllSuppliers = async () => {
        const response = await api.get('supplier');
        return response.data;
    };

    getAllCategories = async () => {
        const response = await api.get('category');
        return response.data;
    };

    getProducts = async () => {
        const allProducts = await this.getAllProducts();
        if (allProducts) this.setState({ products: allProducts });
    };

    componentDidMount() {
        this.getProducts();
        this.getAllSuppliers().then((suppliers) => {
            this.setState({ suppliers });
        });
        this.getAllCategories().then((categories) => {
            this.setState({ categories });
        });
    }

    cancelProduct = () => {
        this.setState({ product: { id: 0 }, showProductModal: false });
    };

    addProduct = async (prod) => {
        const { products } = this.state;
        const response = await api.post('product', prod);
        this.setState({
            products: [...products, response.data],
            showProductModal: false,
        });
    };

    updateProduct = async (prod) => {
        const { products } = this.state;
        const response = await api.put(`product/${prod.id}`, prod);
        const { id } = response.data;
        this.setState({
            products: products.map((item) =>
                item.id === id ? response.data : item
            ),
            product: { id: 0 },
            showProductModal: false,
        });
    };

    deleteProduct = async (id) => {
        const { products } = this.state;
        if (await api.delete(`product/${id}`)) {
            const filteredProducts = products.filter(
                (product) => product.id !== id
            );
            this.setState({
                products: [...filteredProducts],
                smShowConfirmModal: false,
            });
        }
    };

    getProduct = (id) => {
        const { products } = this.state;
        const product = products.filter((product) => product.id === id);
        this.setState({ product: product[0], showProductModal: true });
    };

    render() {
        const {
            showProductModal,
            smShowConfirmModal,
            products,
            categories,
            suppliers,
            product,
        } = this.state;
        return (
            <>
                <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
                    <h1 className="m-0 p-0">Produtos</h1>
                    <Button
                        variant="outline-secondary"
                        onClick={() => this.handleProductModal()}
                    >
                        <i className="fas fa-plus"></i>
                    </Button>
                </div>

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
                        {products.map((product) => (
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
                                                this.getProduct(product.id)
                                            }
                                        >
                                            <i className="fas fa-pen"></i>{' '}
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() =>
                                                this.handleConfirmModal(
                                                    product.id
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash"></i>{' '}
                                            Deletar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal
                    show={showProductModal}
                    onHide={() => this.handleProductModal()}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Produto {product.id !== 0 ? product.id : ''}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProductForm
                            addProduct={(prod) => this.addProduct(prod)}
                            prodSelected={product}
                            products={products}
                            categories={categories}
                            suppliers={suppliers}
                            updateProduct={(prod) => this.updateProduct(prod)}
                            cancelProduct={() => this.cancelProduct()}
                        />
                    </Modal.Body>
                </Modal>

                <Modal
                    show={smShowConfirmModal}
                    onHide={() => this.handleConfirmModal()}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Excluindo Produto{' '}
                            {product.id !== 0 ? product.id : ''}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tem certeza que deseja excluir o produto {product.id}
                    </Modal.Body>
                    <ModalFooter className="d-flex justify-content-between">
                        <Button
                            variant="danger"
                            className="me-2"
                            onClick={() => this.handleConfirmModal(0)}
                        >
                            <i className="fas fa-times me-2"></i>
                            Não
                        </Button>
                        <Button
                            variant="outline-success"
                            className="me-2"
                            onClick={() => this.deleteProduct(product.id)}
                        >
                            <i className="fas fa-check me-2"></i>
                            Sim
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}
