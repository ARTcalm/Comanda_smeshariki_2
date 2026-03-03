import { NavLink } from "react-router"
import { Order } from "./Order/Order"
import style from "./OrdersDisplay.module.css"

export const OrdersDisplay = (props) => {
    
    const {orders} = props
    
    return(
        <>
        <h1>Заказы</h1>
        <div className={style.ordersContainer}>
            {orders.length === 0? 
             <div className={style.nothing}>
                    <h1>Ничего не найдено</h1>
                    <NavLink to={"/"} style={{textDecoration:"none", background:"linear-gradient(-45deg, #378D5A, #27332C)", color:"white", padding:"20px 40px", borderRadius:"32px"}}>Перейти в каталог</NavLink>
            </div>
            :
            orders.map(el => (
                <Order order={el} key={el.id} />
            ))
            }
        </div>
        </>
    )
}
