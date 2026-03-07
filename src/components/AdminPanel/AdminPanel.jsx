import { NavLink, Outlet } from 'react-router-dom';
import style from "./AdminPanel.module.css"
import { useState } from 'react';

export const AdminPanel = () => {

    let [indexNav, setIndexNav] = useState(0)

    return (
        <div className={style.adminContainer}>
            <aside className={style.menuSidebar}>
                <nav className={style.nav}>
                <NavLink onClick={() => setIndexNav(0)} to={""} className={indexNav === 0 ? `${style.link} ${style.active}` : style.link}>Статистика</NavLink>
                <NavLink onClick={() => setIndexNav(1)} to={"goods"} className={indexNav === 1 ? `${style.link} ${style.active}` : style.link}>Товары</NavLink>
                <NavLink onClick={() => setIndexNav(2)} to={"orders"} className={indexNav === 2 ? `${style.link} ${style.active}` : style.link}>Заказы</NavLink>
                <NavLink onClick={() => setIndexNav(3)} to={"categories"} className={indexNav === 3 ? `${style.link} ${style.active}` : style.link}>Категории</NavLink>
                </nav>
            </aside>
            <div className={style.display}>
            <Outlet />
            </div>
        </div>
    )
}