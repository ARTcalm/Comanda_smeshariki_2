import { NavLink, Outlet } from 'react-router-dom';
import style from "./AdminPanel.module.css"
import { useState } from 'react';

export const AdminPanel = () => {


    return (
        <div className={style.adminContainer}>
            <aside className={style.menuSidebar}>
                <nav className={style.nav}>
                <NavLink to={"/admin/"} end={true} className={({isActive}) => `${style.link} ${isActive ? style.active: ""}`} >Статистика</NavLink>
                <NavLink to={"/admin/goods"}  className={({isActive}) => `${style.link} ${isActive ? style.active: ""}`} >Товары</NavLink>
                <NavLink to={"/admin/orders"} className={({isActive}) => `${style.link} ${isActive ? style.active: ""}`}>Заказы</NavLink>
                <NavLink to={"/admin/categories"} className={({isActive}) => `${style.link} ${isActive ? style.active: ""}`}>Категории</NavLink>
                </nav>
            </aside>
            <div className={style.display}>
                <Outlet />  
            </div>
        </div>
    )
}