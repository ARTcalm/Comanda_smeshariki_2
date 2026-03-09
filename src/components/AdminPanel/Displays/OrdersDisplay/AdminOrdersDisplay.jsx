import { AdminOrder } from "./AdminOrder/AdminOrder"
import style from "./AdminOrdersDisplay.module.css"

export const AdminOrdersDisplay = (props) => {
    
    const {orders, setOrders, orderStatuses} = props

    return(<>
        <div className={style.ordersPage}>
            <h1>Заказы</h1>
            <div className={style.ordersContainer}>
                {orders.length > 0 &&
                    orders.map(el => (
                        <AdminOrder order={el} orders={orders} setOrders={setOrders} orderStatuses={orderStatuses}  key={el.id} />
                    ))
                }
            </div>
        </div>
    </>)
}