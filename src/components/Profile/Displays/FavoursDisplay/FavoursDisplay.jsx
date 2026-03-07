import { NavLink, useLocation } from "react-router"
import style from "./FavoursDisplay.module.css"
import { Item } from "../../../Item/Item";

export const FavourDisplay = (props) => {

    const {favoursItems, handleAddCart, handleFavours, handleAddRecently, cartItems,  plus, minus} = props

    return(
        <>
            <h1 style={{color:"black"}} >Избранное</h1> 
            <div className={style.favoursTrack}>
                {favoursItems.length === 0 ? 
                <div className={style.nothing} >
                    <h1>Ничего не найдено</h1>
                    <NavLink to={"/"} style={{textDecoration:"none", background:"linear-gradient(45deg, #004165,#0083CB)", color:"white", padding:"20px 40px", borderRadius:"32px"}}>Перейти в каталог</NavLink>
                </div>:
                    favoursItems.map(el => (
                        <Item item={el} handleAddCart={handleAddCart} handleFavours={handleFavours} handleAddRecently={handleAddRecently}  cartItems={cartItems}  plus={plus} minus={minus} />
                    ))}
            </div>
        </>
    )
}