import { useEffect, useState } from "react"
import style from "./DeliveryForm.module.css"
import { useNavigate } from "react-router"
import { basename } from "../../consts"

export const DeliveryForm = (props) => {

    const {cartItems, DeleteCartItems, setItems, orders, setOrders, setCartItems,  plus, minus} = props
    let summa = 0
    let counts = 0
    cartItems.forEach(el => summa += Number.parseFloat(el.price) * el.cartCount)
    cartItems.forEach(el => counts += el.cartCount)
    
    const date = new Date()
    const day = date.getDate() 
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    
    // Состояние для ошибок валидации
    const [errors, setErrors] = useState({});

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

    // Функция валидации полей
    const validateFields = (name, value) => {
        const newErrors = {};
        
        // Паттерны для валидации
        const patterns = {
            street: /^[а-яА-ЯёЁ0-9\s\-.,/]{5,50}$/, // только русские буквы и пробелы, от 10 до 50 символов
            house: /^[0-9кстКСТ]{1,15}$/, // только цифры и символы к, ст, от 1 до 15 символов
            floorNum: /^[0-9]*$/, // только цифры, может быть пустым
            apartNum: /^[0-9]*$/, // только цифры, может быть пустым
            tel: /^\+7[0-9]{3}[0-9]{3}-[0-9]{2}-[0-9]{2}$/, // формат +7XXXXXXXX-XX-XX
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // формат xxx@xxx.xx
            notice: /^[\s\S]*$/, // любые символы, может быть пустым
            agree: /^true$/ // должен быть true
        };

        // Сообщения об ошибках
        const errorMessages = {
            street: 'Улица указана некорректно',
            house: 'Допустимый формат: 1, 1к1, 1ст1',
            floorNum: 'Этаж должен содержать только цифры',
            apartNum: 'Квартира должна содержать только цифры',
            tel: 'Телефон должен быть в формате: +7XXXXXXXX-XX-XX',
            email: 'Введите корректный email в формате: xxx@xxx.xx',
            agree: 'Необходимо согласие с условиями оформления заказа'
        };

        // Проверка поля
        if (patterns[name]) {
            if (name === 'agree') {
                // Для чекбокса проверяем что значение true
                if (value !== true) {
                    newErrors[name] = errorMessages[name];
                }
            } else if (name === 'floorNum' || name === 'apartNum' || name === 'notice') {
                // Для необязательных полей проверяем только если есть значение
                if (value && value.length > 0 && !patterns[name].test(value)) {
                    newErrors[name] = errorMessages[name];
                } else {
                    newErrors[name] = '';
                }
            } else if (name === 'email') {
                // Email может быть пустым, но если заполнен - проверяем формат
                if (value && value.length > 0 && !patterns[name].test(value)) {
                    newErrors[name] = errorMessages[name];
                } else {
                    newErrors[name] = '';
                }
            } else {
                // Для обязательных полей
                if (!patterns[name].test(value)) {
                    newErrors[name] = errorMessages[name];
                } else {
                    newErrors[name] = '';
                }
            }
        }

        // Обновляем состояние ошибок
        setErrors(prev => ({
            ...prev,
            [name]: newErrors[name] || ''
        }));

        return newErrors;
    };

    // Функция для проверки всей формы перед отправкой
    const validateForm = () => {
        const formErrors = {};
        const fieldsToValidate = ['street', 'house', 'floorNum', 'apartNum', 'tel', 'email', 'notice', 'agree'];
        
        fieldsToValidate.forEach(field => {
            const fieldErrors = validateFields(field, order[field]);
            if (fieldErrors[field]) {
                formErrors[field] = fieldErrors[field];
            }
        });
        
        return {
            isValid: Object.keys(formErrors).length === 0,
            errors: formErrors
        };
    };

    let navigate = useNavigate()
    
    const handleSubmitOrder = (cart) => {
        if(cartItems.length === 0){
            alert("Корзина пуста")
            return;
        }

        // Валидация формы перед отправкой
        const { isValid, errors } = validateForm();
        
        if (!isValid) {
            setErrors(errors);
            console.log(errors)
            alert("Пожалуйста, исправьте ошибки в форме");
            return;
        }

        // Проверка согласия
        if (!order.agree) {
            setErrors(prev => ({
                ...prev,
                agree: 'Необходимо согласие с условиями оформления заказа'
            }));
            alert("Необходимо согласие с условиями оформления заказа");
            return;
        }
        
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        
        setOrder(prev => ({
            ...prev,
            [name]: fieldValue
        }));
        
        validateFields(name, fieldValue);
    };

    return(
        <div className={style.deliveryContainerBG}>
            <form className={style.form} name="delivery-form">
                <h1 className={style.formTitle}>Заполните форму</h1>
                <div className={style.formBG}>
                    <h1>Адрес доставки</h1>
                    <hr style={{border:"1px solid black"}}/>
                    <div className={style.adress}>
                        <label className={`${style.label} ${errors.street ? style.error : ""}`}>
                            Улица
                            <input 
                                onChange={handleChange} 
                                name="street" 
                                value={order.street}  
                                type="text" 
                                placeholder="Город, улица" 
                                required  
                            />
                        </label>
                        <label className={`${style.label} ${errors.house ? style.error : ""}`}>
                            Дом (корпус)
                            <input 
                                onChange={handleChange} 
                                name="house" 
                                value={order.house} 
                                type="text"  
                                placeholder="Дом" 
                                required 
                            />
                        </label>
                        <label className={`${style.label} ${errors.floorNum ? style.error : ""}`}>
                            Этаж
                            <input 
                                onChange={handleChange} 
                                name="floorNum" 
                                value={order.floorNum} 
                                type="text" 
                                placeholder="Этаж" 
                                required 
                            />
                        </label>
                        <label className={`${style.label} ${errors.apartNum ? style.error : ""}`}>
                            Квартира
                            <input 
                                onChange={handleChange} 
                                name="apartNum" 
                                value={order.apartNum} 
                                type="text"  
                                placeholder="Квартира" 
                                required 
                            />
                        </label>
                    </div>
                    <h1>Контактные данные</h1>
                    <hr style={{border:"1px solid black"}}/>
                    <div className={style.contact}>
                        <label className={`${style.label} ${errors.tel ? style.error : ""}`}>
                            Телефон
                            <input 
                                onChange={handleChange} 
                                name="tel" 
                                value={order.tel}  
                                type="text" 
                                placeholder="+7XXXXXXXX-XX-XX" 
                                required
                            />
                        </label>
                        <label className={`${style.label} ${errors.email ? style.error : ""}`}>
                            Электронная почта
                            <input 
                                onChange={handleChange} 
                                name="email" 
                                value={order.email} 
                                type="email"  
                                placeholder="Почта"
                            />
                        </label>
                    </div>
                    <h1>Примечание</h1>
                    <hr style={{border:"1px solid black"}}/>
                    <label className={style.label}>
                        <textarea 
                            id={style.notice} 
                            onChange={handleChange} 
                            name="notice" 
                            value={order.notice} 
                            placeholder="Напишите, если есть какие-то трудности или условия, заранее"
                        />
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
                                <div className={style.card_counter}>
                                    <button onClick={() => plus(el)} >+</button>
                                    <p>{el.cartCount} шт.</p>
                                    <button onClick={() => minus(el)}>-</button>
                                </div>
                            </div>
                            <p className={style.sumPrice}>{el.price*el.cartCount} ₽</p>
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
                            <input 
                                type="checkbox" 
                                className={`${style.checkbox} ${errors.agree ? style.error : "" }`}
                                onChange={handleChange} 
                                name="agree" 
                                checked={order.agree}
                            />
                            <p>Я согласен с <a href="#">пользовательским соглашением и условиями оферты</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}