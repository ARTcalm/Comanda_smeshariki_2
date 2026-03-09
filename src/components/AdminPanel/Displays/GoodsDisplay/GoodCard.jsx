import { useState } from "react"
import { basename } from "../../../../consts"
import style from "./AdminGoodsDisplay.module.css"

export const GoodCard = (props) => {


    const {item, setItems} = props
    let [isChange, setIsChange] = useState(false)

    const handleChangeStorage = (event) => {
        const value = parseInt(event.target.value)
        if(value > 0){
            setItems(prev => {
                return prev.map(prevItem => {
                    if(prevItem.id === item.id){
                        return {...prevItem, storage: value}
                    }
                    return prevItem
                })
            })
        }
        else{
            setItems(prev => {
                return prev.map(prevItem => {
                    if(prevItem.id === item.id){
                        return {...prevItem, storage: 0}
                    }
                    return prevItem
                })
            })
        }
    }


    return(
        <tr key={item.id}>
            <td>{item.id}</td>
            <td><img src={`${basename}${item.image}`} alt={item.name} className={style.itemThumb} /></td>
            <td>{item.name}</td>
            <td>{item.carModel}</td>
            <td>{item.category}</td>
            <td>{item.price} ₽</td>
            {!isChange?<td>{item.storage}</td>:<td><input value={item.storage} onChange={handleChangeStorage} /></td>}
            <td>
                <button onClick={() => setIsChange(isChange = !isChange)} className={style.actionBtn}>{isChange?"Сохранить количество": "Изменить количество"}</button>
            </td>
        </tr>
    )
}