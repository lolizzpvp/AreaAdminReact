import React from 'react';
import TableUsersLine from './TableUsersLine';

const TableUsers = ({ items, handleDeleteUser }) => (
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {items.map(user => (
                <TableUsersLine 
                    key={user.id} 
                    user={user} 
                    handleDeleteUser={handleDeleteUser} 
                />
            ))}
        </tbody>
    </table>
);

export default TableUsers;
