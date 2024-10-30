// src/TableUsersLine.js
import React from 'react';
import { NumberFormatter, StringFormatter } from './formatters';

const TableUsersLine = ({ user, handleDeleteUser }) => {
    return (
        <tr>
            <td>{NumberFormatter.format(user.id, 6)}</td>
            <td>{StringFormatter.Capitalize(user.nome)}</td>
            <td>{user.email}</td>
            <td>{user.telefone}</td>
            <td>
                <button 
                    className="btn btn-outline-danger btn-sm" 
                    title="Excluir" 
                    onClick={() => handleDeleteUser(user.id)}
                >
                    <i className="bi bi-x-circle"></i>
                </button>
            </td>
        </tr>
    );
};

export default TableUsersLine;
