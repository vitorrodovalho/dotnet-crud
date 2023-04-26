import React, { Component } from 'react';
import { Button, Modal, ModalFooter } from 'react-bootstrap';
import api from '../../api/default';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

export class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCategoryModal: false,
            smShowConfirmModal: false,
            categories: [],
            category: { id: 0 },
        };
    }

    handleCategoryModal = () => {
        if (this.state.showCategoryModal)
            this.setState({ category: { id: 0 }, showCategoryModal: false });
        else
            this.setState({ showCategoryModal: !this.state.showCategoryModal });
    };

    handleConfirmModal = (id) => {
        const { categories } = this.state;
        if (id !== 0 && id !== undefined) {
            const category = categories.filter(
                (category) => category.id === id
            );
            this.setState({ category: category[0] });
        } else {
            this.setState({ category: { id: 0 } });
        }
        this.setState({ smShowConfirmModal: !this.state.smShowConfirmModal });
    };

    getAllCategories = async () => {
        const response = await api.get('category');
        return response.data;
    };

    getCategories = async () => {
        const allCategories = await this.getAllCategories();
        if (allCategories) this.setState({ categories: allCategories });
    };

    componentDidMount() {
        this.getCategories();
    }

    cancelCategory = () => {
        this.setState({ category: { id: 0 }, showCategoryModal: false });
    };

    addCategory = async (cat) => {
        const { categories } = this.state;
        const response = await api.post('category', cat);
        this.setState({
            categories: [...categories, response.data],
            showCategoryModal: false,
        });
    };

    updateCategory = async (cat) => {
        const { categories } = this.state;
        const response = await api.put(`category/${cat.id}`, cat);
        const { id } = response.data;
        this.setState({
            categories: categories.map((item) =>
                item.id === id ? response.data : item
            ),
            category: { id: 0 },
            showCategoryModal: false,
        });
    };

    deleteCategory = async (id) => {
        const { categories } = this.state;
        if (await api.delete(`category/${id}`)) {
            const filteredCategories = categories.filter(
                (category) => category.id !== id
            );
            this.setState({
                categories: [...filteredCategories],
                smShowConfirmModal: false,
            });
        }
    };

    getCategory = (id) => {
        const { categories } = this.state;
        const category = categories.filter((category) => category.id === id);
        this.setState({ category: category[0], showCategoryModal: true });
    };

    render() {
        const { showCategoryModal, smShowConfirmModal, categories, category } =
            this.state;
        return (
            <>
                <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
                    <h1 className="m-0 p-0">Categorias</h1>
                    <Button
                        variant="outline-secondary"
                        onClick={() => this.handleCategoryModal()}
                    >
                        <i className="fas fa-plus"></i>
                    </Button>
                </div>

                <CategoryList
                    categories={categories}
                    getCategory={(id) => this.getCategory(id)}
                    handleConfirmModal={(id) => this.handleConfirmModal(id)}
                />

                <Modal
                    show={showCategoryModal}
                    onHide={() => this.handleCategoryModal()}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Categoria {category.id !== 0 ? category.id : ''}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CategoryForm
                            addCategory={(cat) => this.addCategory(cat)}
                            catSelected={category}
                            categories={categories}
                            updateCategory={(cat) => this.updateCategory(cat)}
                            cancelCategory={() => this.cancelCategory()}
                        />
                    </Modal.Body>
                </Modal>

                <Modal
                    show={smShowConfirmModal}
                    onHide={() => this.handleConfirmModal()}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Excluindo Categoria{' '}
                            {category.id !== 0 ? category.id : ''}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tem certeza que deseja excluir a categoria {category.id}
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
                            onClick={() => this.deleteCategory(category.id)}
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
