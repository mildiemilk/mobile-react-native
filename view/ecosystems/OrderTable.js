import OrderStatusButton from '../organisms/OrderStatusButton'
import JsonTable from '../organisms/JsonTable'

export default ({orders, setOrderStatus, transactionInfo}) => {
	
	var orderJsonArray = orders? orders.map( (order, key )=> ({
		buyerName: order.buyerName,
		productName: order.productName,
		total: order.quantity * order.price,
		status: <OrderStatusButton status={order.status} setOrderStatus={setOrderStatus} transactionInfo={transactionInfo}/>,
		key: key
	})):null

	const headerJson = {
		buyerName: 'Name',
		productName: 'Product',
		total: 'Total',
		status: 'Status'
	}

	return <JsonTable headerJson={headerJson} bodyJsonArray={orderJsonArray}/>
}
