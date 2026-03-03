import { useEffect, useState } from "react"
import style from "./DeliveryForm.module.css"
import { useNavigate } from "react-router"
import { basename } from "../../consts"

export const DeliveryForm = (props) => {

    const {cartItems, DeleteCartItems, setItems, orders, setOrders, setCartItems} = props
    let summa = 0
    let counts = 0
    cartItems.forEach(el => summa += Number.parseFloat(el.price) * el.count)
    cartItems.forEach(el => counts += el.count)
    
    const date = new Date()
    const day = date.getDate() 
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    

    const generatorIDs = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result
    }

    const [order, setOrder] = useState({
        id: `#${generatorIDs(10)}`,
        date:`${day < 10? `0${day}`:day}.${month < 10? `0${month}`:month}.${year}`,
        order:cartItems,
        street:'',
        house:'',
        floorNum: '',
        apartNum: '',
        tel:'',
        email:'',
        notice:'',
        agree:false,
        summa: summa,
        counts: counts,
    })

    let navigate = useNavigate()
    const handleSubmitOrder = (cart) => {
        if(cartItems.length === 0){
            alert("Корзина пуста")
        }
        else{
            setOrder(order => {
                return {...order, id:`#${generatorIDs(10)}`}
            })
            setOrders(prev => {
                const submitOrder = new Object(order) 
                return [...prev, submitOrder]
            })
            cart.map(el => {
                setItems(items => {
                    return items.map(item => {
                        if(item.id === el.id){
                            return {...item, storage:item.storage - el.count < 0 ? 0 : item.storage-el.count }
                        }
                        return item
                    })
                })
            })
            setCartItems([])
            navigate("/")
            alert("Заказ успешно оформлен")
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setOrder(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        validateFields(name,value)
    };


    return(
        <div className={style.deliveryContainerBG}>
            <form className={style.form} name="delivery-form">
                <h1 className={style.formTitle}>Заполните форму</h1>
                <div className={style.formBG}>
                    <h1>Адрес доставки</h1>
                    <hr style={{border:"1px solid black"}}/>
                    <div className={style.adress}>
                        <label className={style.label}>
                            Улица
                            <input onChange={handleChange} name="street" value={order.street}  type="text" placeholder="Город, район, улица" required  />
                        </label>
                        <label className={style.label}>
                            Дом (корпус)
                            <input onChange={handleChange} name="house" value={order.house} type="text"  placeholder="Дом" required />
                        </label>
                        <label className={style.label}>
                            Этаж
                            <input onChange={handleChange} name="floorNum" value={order.floorNum} type="text" placeholder="Этаж" required />
                        </label>
                        <label className={style.label}>
                            Квартира
                            <input onChange={handleChange} name="apartNum" value={order.apartNum} type="text"  placeholder="Квартира" required />
                        </label>
                    </div>
                    <h1>Контактные данные</h1>
                    <hr style={{border:"1px solid black"}}/>
                    <div className={style.contact}>
                        <label className={style.label}>
                            Телефон
                            <input onChange={handleChange} name="tel" value={order.tel}  type="number" placeholder="Телефон" required/>
                        </label>
                        <label className={style.label}>
                            Электронная почта
                            <input onChange={handleChange} name="email" value={order.email} type="email"  placeholder="Почта"/>
                        </label>
                    </div>
                    <h1>Примечание</h1>
                    <hr style={{border:"1px solid black"}}/>
                    <label className={style.label}>
                        <textarea id={style.notice} onChange={handleChange} name="notice" value={order.notice} placeholder="Напишите, если есть какие-то трудности или условия, заранее"></textarea>
                    </label>
                </div>
            </form>
            <div className={style.informationPanels}>
                <div className={style.cartItemsTrack}>

                    {cartItems.map(el => (
                        <div key={el.id} className={style.trackCard}>
                            <img src={`${basename}${el.image}`}  />
                            <div>
                                <h1>{el.name}</h1>
                                <p>{el.count} шт</p>
                            </div>
                            <p className={style.sumPrice}>{el.price*el.count} ₽</p>
                            <svg width="35" height="35" viewBox="0 0 16 16" onClick={() => DeleteCartItems(el.id)}><path fill="currentColor" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"></path></svg>
                        </div>
                    ))}
                </div>
                <div className={style.info}>
                    <p>Количество штук: {counts}</p>
                    <h1>Итого: {summa}₽</h1>
                    <div className={style.submit}>
                    <button id="submit" form="delivery-form" onClick={() => handleSubmitOrder(cartItems)} >Подтвердить покупку</button>
                        <div>
                            <input onChange={handleChange} name="agree" value={order.agree} type='checkbox' form="delivery-form" />
                            <p>Я согласен с <a href="#">пользовательским соглашением и условиями оферты</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}