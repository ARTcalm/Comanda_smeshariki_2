
import style from "./Profile.module.css"
import { NavLink, Outlet } from "react-router"

export const Profile = (props) => {
    
    return(
        <>
            <div className={style.personalCabinetBG}>
                <div className={style.sideBarMenu}>
                    <NavLink to={""} className={style.buttonMenu} >Профиль</NavLink>
                    <NavLink to={"orders"} className={style.buttonMenu} >Заказы</NavLink>
                    <NavLink to={"favours"} className={style.buttonMenu} >Избранное</NavLink>
                </div>
                <div className={style.display}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}