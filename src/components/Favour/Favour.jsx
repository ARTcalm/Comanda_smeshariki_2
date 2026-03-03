import style from "./Favour.module.css"
import { NavLink } from "react-router";
import { Item } from "../Item/Item";

export const Favours = (props) => {

    const {favoursItems, handleAddCart, handleFavours, handleAddRecently, cartItems,  plus, minus} = props

    return(
        <div className={style.favoursBG}>
            <div className={style.favoursTrack}> 
                <h1 style={{color:"white"}}>Избранные</h1>
                <hr style={{width:"100%"}}/>
                <div className={style.cards}>
                    {favoursItems.length === 0 ? 
                        <div className={style.nothing} >
                            <h1>Ничего не найдено</h1>
                            <NavLink to={"/"} style={{textDecoration:"none", background:"white", color:"black", padding:"20px 40px", borderRadius:"32px"}}>Перейти в каталог</NavLink>
                        </div>:
                        favoursItems.map(el => (
                            <Item item={el} cartItems={cartItems} handleAddCart={handleAddCart} handleFavours={handleFavours} handleAddRecently={handleAddRecently} plus={plus} minus={minus}  />
                        ))}
                </div>
            </div>
        </div>
    )
}
