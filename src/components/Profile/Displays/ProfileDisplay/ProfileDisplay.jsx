import { NavLink } from "react-router"
import style from "./ProfileDisplay.module.css"
import { Item } from "../../../Item/Item"
import { useState } from "react"

export const ProfileDisplay = (props) => {

    const {orders, favoursItems, recentlyItems, handleFavours, handleAddCart, handleAddRecently} = props
    let [animation,setAnimation] = useState(false)
    return(
        <>
        <div className={style.profile}>
            <div className={style.profileBlock}>
                <div className={style.profileIcon}>
                    <img src="./img/profileIcon.png" />
                </div>
                <div className={style.userInfo}>
                    <div>
                        <h1>Имя</h1>
                        <p>Ришат</p>
                    </div>
                    <div>
                        <h1>Телефон</h1>
                        <p>+79999999999</p>
                    </div>
                    <div>
                        <h1>Почта</h1>
                        <p>washemail@mail.ru</p>
                    </div>
                </div>

            </div>
            <div className={style.widgets}>
                <NavLink to={"orders"} className={style.widgetBG} >
                    <div className={style.widgetInfo}  >
                        <img />
                        <h1>Заказы</h1>
                        <p>{orders.length !== 0 ? orders.length: 0} </p>
                    </div>
                </NavLink>
                <NavLink to={"favours"}  className={style.widgetBG}>
                    <div className={style.widgetInfo}>
                        <img />
                        <h1>Избранное</h1>
                        <p>{favoursItems.length !== 0 ? favoursItems.length : 0}</p>
                    </div>
                </NavLink>    
            </div>
        </div>
        <div className={style.recentlyContainer}>
            <h1 className={style.title}>Вы недавно смотрели</h1>
            <div className={style.recentlyTrack}>
                {recentlyItems.map(item => (
                    <Item item={item} handleFavours={handleFavours} handleAddCart={handleAddCart} handleAddRecently={handleAddRecently}/>
                ))}
            </div>
        </div>
        </>
    )
}