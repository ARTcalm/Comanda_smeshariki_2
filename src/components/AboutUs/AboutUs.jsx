import { NavLink } from "react-router"
import style from "./AboutUs.module.css"


export const AbouUs =() => {
    return(
        <div>
            <div>
                <div className={style.greeting}>
                    <div className={style.greetingUpText}>
                        <h1>Добро пожаловать на APLN MARKET </h1>
                        <h2>Уже 5 лет наш магазин обеспечивает вас только лучшими товарами</h2>
                    </div>
                </div>
                <div className={style.advantages}>
                    <div className={style.advantage}>
                        <h1>3 млн+</h1>
                        <p>заказов в день обрабатываются в магазине</p>
                    </div>
                    <div className={style.advantage}>
                        <h1>1 млн кв.м</h1>
                        <p>складских помещений</p>
                    </div>
                    <div className={style.advantage}>
                        <h1>215 млн+</h1>
                        <p>товаров на складе</p>
                    </div>
                </div>
                <div className={style.marketing}>
                    <h1>Покупайте на APLN MARKET</h1>
                    <div className={style.marketingCards}>
                        <div className={style.marketingCard}>
                            <h2>Быстрая доставка</h2>
                            <img src="./img/marketingIcon 1.png"/>
                        </div>
                        <div className={style.marketingCard}>
                            <h2>Удобный самовывоз</h2>
                            <img src="./img/marketingIcon 2.png"/>
                        </div>
                        <div className={style.marketingCard}>
                            <h2>Лучшее качество</h2>
                            <img src="./img/marketingIcon 3.png"/>
                        </div>
                    </div>
                    <NavLink to={"/"} className={style.navButton}>Перейти в каталог →</NavLink>
                </div>
            </div>
        </div>
    )
}