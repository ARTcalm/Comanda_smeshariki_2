import { useState } from "react"
import style from "./Order.module.css"

export const Order = (props) => {

    const {order} = props
    let [showFullOrder, setShowFullOrder] = useState(false)


    return(
        <>
            <div className={style.orderCard} >
                <div className={style.topPanel}>
                    <div>
                        <p>Номер заказа: {order.id}</p>
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
                                <td><img src={el.img} /> </td>
                                <td style={{maxWidth:"150px"}}>{el.name}</td>
                                <td>{el.price}₽</td>
                                <td>{el.count}</td>
                                <td>{el.count * el.price}₽</td>
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
                                        <a>{order.floorNum}</a>
                                    </div>
                                    <div className={style.apartNumField}>
                                        <p>Квартира</p>
                                        <a>{order.apartNum}</a>
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
                                        <a>{order.email}</a>
                                    </div>
                                </div>
                            </div>
                            <div className={style.noticeInfo}>
                                <h2>Примечание</h2>
                                <div className={style.fields}>
                                    <textarea disabled >{order.notice}</textarea>
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