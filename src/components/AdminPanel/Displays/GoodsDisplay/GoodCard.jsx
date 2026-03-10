import { useEffect, useState } from "react"
import { basename } from "../../../../consts"
import style from "./AdminGoodsDisplay.module.css"
import { useLocation } from "react-router"

export const GoodCard = (props) => {

    const location = useLocation()
    const { item, items, setItems } = props
    let [isChange, setIsChange] = useState(false)
    const [newStorage, setNewStorage] = useState(item.storage)

    const handleChangeStorage = (event) => {
        const value = parseInt(event.target.value)
        setNewStorage(value > 0 ? value : 0)
    }

    const handleSave = () => {
        if(confirm("Вы уверены, что хотите изменить значения?")){
            setItems(prev => {
                return prev.map(prevItem => {
                    if(prevItem.id === item.id){
                        return {...prevItem, storage: newStorage}
                    }
                    return prevItem
                })
            })
            setIsChange(false)
        }
        else{
            setNewStorage(item.storage)
            setIsChange(false)
        }
    }

    useEffect(() => {
        setNewStorage(item.storage)
        setIsChange(false)
    }, [item.storage, location])

    return(
        <tr key={item.id} className={`${style.good} ${item.storage > 0 && item.storage < 10 ? style.warning : item.storage === 0 ? style.ended: ""}`}>
            <td>{item.id}</td>
            <td><img src={`${basename}${item.image}`} alt={item.name} className={style.itemThumb} /></td>
            <td>{item.name}</td>
            <td>{item.carModel}</td>
            <td>{item.category}</td>
            <td>{item.price} ₽</td>
            {!isChange?<td>{item.storage}</td>:<td><input value={newStorage} onChange={handleChangeStorage} /></td>}
            <td>
                <button onClick={() => {setIsChange(isChange = !isChange), !isChange?handleSave():"" }} className={style.actionBtn}>{isChange?"Сохранить количество": "Изменить количество"}</button>
            </td>
        </tr>
    )
}