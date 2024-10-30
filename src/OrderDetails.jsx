import { useNavigate, useParams } from 'react-router-dom'
import api from './axiosApi'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import { NumberFormatter, DateTimeFormatter, CurrencyFormatter, StringFormatter } from './formatters';

const OrderDetails = () => {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const orderId = useParams().id
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        api.get(`obter_pedido/${orderId}`)
            .then(response => {
                if (response.status === 200) {
                console.log(response.data)
                setOrder(response.data)
                } else {
                    navigate("/orders")
                }
            })
            .catch(error => {
                //console.error('Erro ao carregar pedido: ', error)
                navigate("/orders")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [orderId])

    if (!order) {
        return <p>Carregando detalhes do pedido...</p>
    }


  return (
    <>
        {loading && <Loading />}  
        <h1 className="display-6 my-3">Detalhes de Pedido</h1>
        <hr />
        <div className="card p-3 mb-3">
            <p className='m-0'>
                <b>Código do pedido: </b> {NumberFormatter.format(order.id, 6)} <br />
                <b>Data do pedido: </b> {DateTimeFormatter.format(new Date(order.data_hora))} <br />
                <b>Valor Total: </b> {CurrencyFormatter.format(order.valor_total)} <br />
                <b>Estado: </b> {StringFormatter.Capitalize(order.estado)} <br />
            </p>
            <p className='m-0'>
                <b>Cliente: </b> {order.cliente.nome}
            </p>
            <hr />
            <p className='m-0'>
                <b>Itens do Pedido</b>
            </p>
            <table className='table table-striped table-sm mb-0'>
    <thead>
        <tr>
            <th>Produto</th>
            <th>Valor Unit.</th>
            <th>Qtde.</th>
            <th>Valor item</th>
        </tr>
    </thead>
    <tbody>
        {order.itens.map((item, index) => (
            <tr key={index}>
                <td>{item.nome_produto}</td>
                <td>{CurrencyFormatter.format(item.valor_produto)}</td>
                <td>{NumberFormatter.format(item.quantidade, 3)}</td>
                <td>{CurrencyFormatter.format(item.valor_item)}</td>
            </tr>
        ))}
    </tbody>
</table>
        </div>
    </>
  )
}

export default OrderDetails