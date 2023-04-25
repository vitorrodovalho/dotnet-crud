import React from 'react';
import DataTable from 'react-data-table-component';

export default function CategoryTable(props) {
    const columns = [
        { name: 'ID', selector: 'id', sortable: true },
        { name: 'Nome', selector: 'name', sortable: true },
        {
            name: 'Ações',
            cell: (row) => (
                <div>
                    <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => props.getCategory(row.id)}
                    >
                        <i className="fas fa-pen"></i> Editar
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => props.handleConfirmModal(row.id)}
                    >
                        <i className="fas fa-trash"></i> Deletar
                    </button>
                </div>
            ),
        },
    ];

    const data = props.categories.map((cat) => {
        return {
            id: cat.id,
            name: cat.name,
        };
    });

    return (
        <DataTable columns={columns} data={data} pagination highlightOnHover />
    );
}
