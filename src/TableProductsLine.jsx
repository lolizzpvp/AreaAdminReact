import { NumberFormatter, CurrencyFormatter } from './formatters';

const TableProductsLine = ({ item, handleDeleteProduct }) => {
    return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{item.nome}</td>
            <td>{CurrencyFormatter.format(item.preco)}</td>
            <td>{NumberFormatter.format(item.estoque, 6)}</td>
            <button className="btn btn-outline-danger btn-sm" title="Excluir" onClick={() => handleDeleteProduct(item.id)}>
                <i className="bi bi-x-circle"></i>
            </button>
        </tr>
    )
}

export default TableProductsLine;