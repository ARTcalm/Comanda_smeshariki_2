import { useEffect } from "react"
import style from "./Cart.module.css"
import { NavLink, Outlet, useNavigate } from "react-router"
import { basename } from "../../consts"


export const Cart = (props) => {
    const {cartItems, setCartItems, handleFavours, handleAddRecently, DeleteCartItems,  plus, minus} = props
    


    let summa = 0
    let counts = 0
    cartItems.forEach(el => summa += Number.parseFloat(el.price) * el.cartCount)
    cartItems.forEach(el => counts += el.cartCount)
    const navigate = useNavigate()

    return(
        <div className={style.cart_container}>
                <div className={style.cart_track}>
                    <div className={style.cart_title}>
                        <h1>Корзина</h1>
                        <p>товаров: {cartItems.length}</p>
                    </div>
                    <hr/>
                    <div className={style.cards} > 
                        {cartItems.length === 0 ? 
                        <div className={style.nothing   }>
                            <h1>Ничего не найдено</h1>
                            <NavLink to={"/"} style={{textDecoration:"none", background:"gainsboro", color:"black", padding:"20px 40px", borderRadius:"32px"}}>Перейти в каталог</NavLink>
                        </div>
                        : cartItems.map(el => (
                            <div key={el.id} className={style.cart_card}>
                                <img  src={`${basename}${el.image}`} onClick={() => {navigate(`/product/${el.category}/${el.id}`), handleAddRecently(el)}}/>
                                <div className={style.card_desc}>
                                    <div className={style.card_title}>
                                        <h1>{el.name}</h1>
                                        <div className={style.features_card}>
                                            <div onClick={() => handleFavours(el)}><svg className={`${style.favours} ${el.favours ? style.active : ''}`} width="40" height="40" viewBox="0 0 55 55" fill="none"><path d="M49.5752 15.2324C48.8553 13.5654 47.8172 12.0548 46.519 10.7852C45.2199 9.51171 43.6883 8.49971 42.0073 7.80421C40.2643 7.08015 38.3948 6.70953 36.5073 6.71387C33.8594 6.71387 31.2759 7.43897 29.0308 8.8086C28.4937 9.13624 27.9834 9.4961 27.5 9.88819C27.0166 9.4961 26.5063 9.13624 25.9692 8.8086C23.7241 7.43897 21.1406 6.71387 18.4927 6.71387C16.5859 6.71387 14.7383 7.07911 12.9927 7.80421C11.3062 8.50245 9.78613 9.50684 8.48096 10.7852C7.18113 12.0534 6.1428 13.5644 5.4248 15.2324C4.67822 16.9673 4.29688 18.8096 4.29688 20.7056C4.29688 22.4941 4.66211 24.3579 5.38721 26.2539C5.99414 27.8384 6.86426 29.4819 7.97607 31.1416C9.73779 33.7681 12.1602 36.5073 15.168 39.2842C20.1523 43.8872 25.0884 47.0669 25.2979 47.1958L26.5708 48.0122C27.1348 48.3721 27.8599 48.3721 28.4238 48.0122L29.6968 47.1958C29.9063 47.0615 34.8369 43.8872 39.8267 39.2842C42.8345 36.5073 45.2568 33.7681 47.0186 31.1416C48.1304 29.4819 49.0059 27.8384 49.6074 26.2539C50.3325 24.3579 50.6978 22.4941 50.6978 20.7056C50.7031 18.8096 50.3218 16.9673 49.5752 15.2324Z" /></svg></div>
                                            <div onClick={() => DeleteCartItems(el.id)}><svg className={style.trashbacket} width="35" height="35" viewBox="0 0 16 16"><path fill="currentColor" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"></path></svg></div>
                                        </div>
                                    </div>
                                    <div className={style.parameters}>
                                        <div className={`${style.parameter} ${style.pricePerPiece}`}>
                                            <h1>Цена за штуку</h1>
                                            <p>{el.price}₽</p>
                                        </div>
                                        <div className={`${style.parameter} ${style.card_counter}`}>
                                            <button onClick={() => plus(el)} >+</button>
                                            <p>{el.cartCount} шт.</p>
                                            <button onClick={() => minus(el)}>-</button>
                                        </div>
                                        <div className={`${style.parameter} ${style.sumPrice}`}>
                                            <h1>Сумма</h1>
                                            <p>{el.price*el.cartCount}₽</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    <div className={style.cartResult} style={{display:cartItems.length === 0 ? "none" : "flex"}}>
                        <div>
                            <p style={{fontSize:"16px", color:"#484C4A"}}>Количество: {counts} шт.</p>
                            <p style={{fontSize:"24px", display:"flex", color:"black", justifyContent:"space-between"}}>Итого: {summa}₽</p>
                        </div>
                        <NavLink to={"delivery-form"}>Перейти к оформлению</NavLink>
                    </div>
                </div>
        </div>
    )
}