import { NavLink } from "react-router"
import style from "./Footer.module.css"
import { basename } from "../../../consts"

export const Footer = () => {
    return(
    <div className={style.footerBG} >
        <div className={style.footerContainer}>
            <div className={style.clientsNav}>
                <h1>Клиентам</h1>
                <nav>
                    <NavLink>Условия доставки</NavLink>
                    <NavLink>Способы оплаты</NavLink>
                    <NavLink>Возврат товара</NavLink>
                    <NavLink>Возврат средств</NavLink>
                    <NavLink>Как сделать заказ</NavLink>
                    <NavLink>Условия работы для клиентов</NavLink>
                    <NavLink>Политика конфиденциальности</NavLink>
                </nav>
            </div>
            <div className={style.menuNav}>
                <h1>Меню</h1>
                <div className={style.nav}>
                    <div className={style.menuButton} ><NavLink to={"/"} >КАТАЛОГ</NavLink></div>
                    <div className={style.menuButton} ><NavLink to={"/aboutus"} >О НАС</NavLink></div>
                    <div className={style.menuButton} ><NavLink to={"/contacts"} >КОНТАКТЫ</NavLink></div>
                    <div className={style.menuButton} ><NavLink to={"/profile"} >ПРОФИЛЬ</NavLink></div>
                    <div className={style.menuButton} ><NavLink to={"/cart"} >КОРЗИНА</NavLink></div>
                    <div className={style.menuButton} ><NavLink to={"/favours"} >ИЗБРАННОЕ</NavLink></div>
                </div>
            </div>
            <img id={style.logo} src={`${basename}/img/Logo.svg`} />
        </div>
    </div>
    )
}