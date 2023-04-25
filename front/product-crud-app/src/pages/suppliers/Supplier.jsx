import React, { Component, useState, useEffect } from 'react';
import { Button, Modal, ModalFooter } from 'react-bootstrap';
import api from '../../api/default';
import SupplierForm from './SupplierForm';
import SupplierList from './SupplierList';

export class Supplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSupplierModal: false,
            smShowConfirmModal: false,
            suppliers: [],
            supplier: { id: 0 },
        };
    }

    handleSupplierModal = () => {
        if (this.state.showSupplierModal) {
            this.setState({ supplier: { id: 0 }, showSupplierModal: false });
        }
        this.setState({ showSupplierModal: !this.state.showSupplierModal });
    };

    handleConfirmModal = (id) => {
        const { suppliers } = this.state;
        if (id !== 0 && id !== undefined) {
            const supplier = suppliers.filter((supplier) => supplier.id === id);
            this.setState({ supplier: supplier[0] });
        } else {
            this.setState({ supplier: { id: 0 } });
        }
        this.setState({ smShowConfirmModal: !this.state.smShowConfirmModal });
    };

    getAllSuppliers = async () => {
        const response = await api.get('supplier');
        return response.data;
    };

    getSuppliers = async () => {
        const allSuppliers = await this.getAllSuppliers();
        if (allSuppliers) this.setState({ suppliers: allSuppliers });
    };

    componentDidMount() {
        this.getSuppliers();
    }

    cancelSupplier = () => {
        this.setState({ supplier: { id: 0 }, showSupplierModal: false });
    };

    addSupplier = async (sup) => {
        const { suppliers } = this.state;
        const response = await api.post('supplier', sup);
        this.setState({
            suppliers: [...suppliers, response.data],
            showSupplierModal: false,
        });
    };

    updateSupplier = async (sup) => {
        const { suppliers } = this.state;
        const response = await api.put(`supplier/${sup.id}`, sup);
        const { id } = response.data;
        this.setState({
            suppliers: suppliers.map((item) =>
                item.id === id ? response.data : item
            ),
            supplier: { id: 0 },
            showSupplierModal: false,
        });
    };

    deleteSupplier = async (id) => {
        const { suppliers } = this.state;
        if (await api.delete(`supplier/${id}`)) {
            const filteredSuppliers = suppliers.filter(
                (supplier) => supplier.id !== id
            );
            this.setState({
                suppliers: [...filteredSuppliers],
                smShowConfirmModal: false,
            });
        }
    };

    getSupplier = (id) => {
        const { suppliers } = this.state;
        const supplier = suppliers.filter((supplier) => supplier.id === id);
        this.setState({ supplier: supplier[0], showSupplierModal: true });
    };

    render() {
        const { showSupplierModal, smShowConfirmModal, suppliers, supplier } =
            this.state;
        return (
            <>
                <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
                    <h1 className="m-0 p-0">Fornecedores</h1>
                    <Button
                        variant="outline-secondary"
                        onClick={() => this.handleSupplierModal()}
                    >
                        <i className="fas fa-plus"></i>
                    </Button>
                </div>

                <SupplierList
                    suppliers={suppliers}
                    getSupplier={(id) => this.getSupplier(id)}
                    handleConfirmModal={(id) => this.handleConfirmModal(id)}
                />

                <Modal
                    show={showSupplierModal}
                    onHide={() => this.handleSupplierModal()}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Fornecedor {supplier.id !== 0 ? supplier.id : ''}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SupplierForm
                            addSupplier={(sup) => this.addSupplier(sup)}
                            supSelected={supplier}
                            suppliers={suppliers}
                            updateSupplier={(sup) => this.updateSupplier(sup)}
                            cancelSupplier={() => this.cancelSupplier()}
                        />
                    </Modal.Body>
                </Modal>

                <Modal
                    show={smShowConfirmModal}
                    onHide={() => this.handleConfirmModal()}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Excluindo Fornecedor{' '}
                            {supplier.id !== 0 ? supplier.id : ''}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tem certeza que deseja excluir o fornecedor{' '}
                        {supplier.id}
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
                            onClick={() => this.deleteSupplier(supplier.id)}
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
