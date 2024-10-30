import { useState } from "react";
import axios from "axios";
import { NumberFormatter, DateTimeFormatter, CurrencyFormatter, StringFormatter } from './formatters';

// Sequência de estados para progredir o pedido
const estadosSequencia = ['carrinho', 'pendente', 'pago', 'faturado', 'separado', 'enviado', 'entregue'];

const TableOrdersLine = ({ item, onStateChange }) => {
    const [estadoAtual, setEstadoAtual] = useState(item.estado);

    // Função para alterar o estado do pedido
    const alterarEstado = (novoEstado) => {
        axios.post('/admin/alterar_pedido', {
            id: item.id,
            estado: novoEstado
        })
        .then(response => {
            setEstadoAtual(novoEstado);  // Atualiza o estado local após a alteração
            onStateChange(item.id, novoEstado);  // Callback para notificar o componente pai
        })
        .catch(error => {
            console.error('Erro ao alterar o estado do pedido:', error);
        });
    };

    // Função para progredir o estado do pedido
    const progredirEstado = () => {
        const estadoAtualIndex = estadosSequencia.indexOf(estadoAtual);
        if (estadoAtualIndex >= 0 && estadoAtualIndex < estadosSequencia.length - 1) {
            const novoEstado = estadosSequencia[estadoAtualIndex + 1];
            alterarEstado(novoEstado);
        }
    };

    // Função para cancelar o pedido
    const cancelarPedido = () => {
        alterarEstado('cancelado');
    };

    return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{DateTimeFormatter.format(new Date(item.data_hora))}</td>
            <td>{CurrencyFormatter.format(item.valor_total)}</td>
            <td>{StringFormatter.Capitalize(estadoAtual)}</td>
            <td>
                {/* Botões de Ação */}
                <button onClick={() => console.log(`Ver detalhes do pedido ${item.id}`)}>
                    Ver Detalhes
                </button>
                <button onClick={progredirEstado}>
                    Progredir Estado
                </button>
                <button onClick={cancelarPedido}>
                    Cancelar
                </button>
            </td>
        </tr>
    );
};

export default TableOrdersLine;
