import { basename } from "../../../../consts"
import style from "./AdminGoodsDisplay.module.css"

export const AdminGoodsDisplay = (props) => {
    
    const {items} = props

    return(
    <>
    <div className={style.goodsPage}>
        <h1>Товары</h1>
        <div className={style.tableWrapper}>
            <table className={style.adminTable}>
            <thead>
                <tr>
                <th>ID</th>
                <th>Изображение</th>
                <th>Название</th>
                <th>Модель</th>
                <th>Категория</th>
                <th>Цена за шт.</th>
                <th>Склад</th>
                <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><img src={`${basename}${item.image}`} alt={item.name} className={style.itemThumb} /></td>
                    <td>{item.name}</td>
                    <td>{item.carModel}</td>
                    <td>{item.category}</td>
                    <td>{item.price} ₽</td>
                    <td>{item.storage}</td>
                    <td>
                    <button className={style.actionBtn}>Изменить количество</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
    </>
    )
}