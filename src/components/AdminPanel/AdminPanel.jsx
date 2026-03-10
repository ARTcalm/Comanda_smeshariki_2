import { NavLink, Outlet } from 'react-router-dom';
import style from "./AdminPanel.module.css"
import { useState } from 'react';

export const AdminPanel = (props) => {

    const {items} = props

    return (
        <div className={style.adminContainer}>
            <aside className={style.menuSidebar}>
                <nav className={style.nav}>
                <NavLink to={"/admin/"} end={true} className={({isActive}) => `${style.link} ${isActive ? style.active: ""}`} >Статистика</NavLink>
                <NavLink to={"/admin/goods"}  className={({isActive}) => `${style.link} ${isActive ? style.active: ""}`} >Товары</NavLink>
                <NavLink to={"/admin/orders"} className={({isActive}) => `${style.link} ${isActive ? style.active: ""}`}>Заказы</NavLink>
                <NavLink to={"/admin/categories"} className={({isActive}) => `${style.link} ${isActive ? style.active: ""}`}>Категории</NavLink>
                <NavLink to={"/admin/ending-goods"} className={({isActive}) => `${style.link} ${style.ending} ${isActive ? style.active: ""}`}>Заканчиваются <span className={style.counter}>{items.filter(item => item.storage > 0 && item.storage < 10).length}</span></NavLink>
                <NavLink to={"/admin/ended-goods"} className={({isActive}) => `${style.link} ${style.ended} ${isActive ? style.active: ""} `}>Закончились<span className={style.counter}>{items.filter(item => item.storage === 0).length}</span></NavLink>
                </nav>
            </aside>
            <div className={style.display}>
                <Outlet />  
            </div>
        </div>
    )
}