import { useState } from "react"
import style from "./AdminOrder.module.css"
import { basename } from "../../../../../consts"

export const AdminOrder = (props) => {

    const {order, orders, setOrders, orderStatuses} = props
    let [showFullOrder, setShowFullOrder] = useState(false)

    const handleChangeStatus = event => {
        const value = event.target.value
        if(confirm("Вы уверены что хотите изменить статус?")){
            setOrders(orders => {
                return orders.map(prevOrder => {
                    if(prevOrder.id === order.id){
                        return {...prevOrder, status:value}
                    }
                    return prevOrder
                })
            })
        }
        else{
            event.target.value = order.status
        }
        console.log(orders)
    }

    return(
        <>
            <div className={style.orderCard} >
                <div className={style.topPanel}>
                    <div>
                        <p>Номер заказа: {order.id}</p>
                        <select className={`${style.statusSelect} ${order.status === "Выполнен"? style.complete : order.status === "Отменён" ? style.cancel : ""}`} onChange={handleChangeStatus}>
                            {orderStatuses.map((status, index) => (
                                <option key={index} value={status}  selected={status === order.status? true : false} >{status}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>Дата заказа: {order.date}</p>
                        <p>Итого: {order.summa}₽</p>
                        <svg className={`${style.chevron} ${showFullOrder? style.active:style.noactive}`} onClick={() => setShowFullOrder(showFullOrder = !showFullOrder)} style={{cursor:"pointer"}} width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 9l8 8l8-8"></path></svg>
                    </div>
                </div>
                <div className={style.orderItemsContainer}>
                    {showFullOrder && (
                        <>
                        <table>
                            <tr>
                                <td className={style.article}>Артикул</td>
                                <td>Изображение</td>
                                <td>Название</td>
                                <td>Цена за шт.</td>
                                <td>Кол-во шт.</td>
                                <td>Общая сумма</td>
                            </tr>
                            {order.order.map(el => (
                            <tr className={style.itemsCard} >
                                <td>{el.id}</td>
                                <td><img src={`${basename}${el.image}`} /> </td>
                                <td style={{maxWidth:"150px"}}>{el.name}</td>
                                <td>{el.price}₽</td>
                                <td>{el.cartCount}</td>
                                <td>{el.cartCount * el.price}₽</td>
                            </tr>
                            ))}
                        </table>
                        <div className={style.orderInfo}>
                            <div className={style.adressInfo}>
                                <h2>Адрес доставки</h2>
                                <div className={style.fields}>
                                    <div className={style.adressField}>
                                        <p>Адрес</p>
                                        <a>{order.street},{order.house}</a>
                                    </div>
                                    <div className={style.floorNumField}>
                                        <p>Этаж</p>
                                        <a>{order.floorNum ? order.floorNum: "-"}</a>
                                    </div>
                                    <div className={style.apartNumField}>
                                        <p>Квартира</p>
                                        <a>{order.apartNum? order.apartNum: "-"}</a>
                                    </div>
                                </div>
                            </div>
                            <div className={style.contactInfo}>
                                <h2>Контактные данные</h2>
                                <div className={style.fields}>
                                    <div className={style.telField}>
                                        <p>Телефон</p>
                                        <a>{order.tel}</a>
                                    </div>
                                    <div className={style.emailField}>
                                        <p>Почта</p> 
                                        <a>{order.email ? order.email : "-"}</a>
                                    </div>
                                </div>
                            </div>
                            <div className={style.noticeInfo}>
                                <h2>Примечание</h2>
                                <div className={style.fields}>
                                    <textarea disabled value={order.notice? order.notice : "Пусто"} ></textarea>
                                </div>
                            </div>
                        </div>   
                        </> 
                    )}
                </div>
            </div>
        </>
    )

}