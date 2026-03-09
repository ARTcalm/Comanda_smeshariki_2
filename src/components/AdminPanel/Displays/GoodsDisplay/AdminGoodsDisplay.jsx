import style from "./AdminGoodsDisplay.module.css"
import { GoodCard } from "./GoodCard"

export const AdminGoodsDisplay = (props) => {
    
    const {items, setItems} = props

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
                    <GoodCard item={item} setItems={setItems} />
                ))}
            </tbody>
            </table>
        </div>
    </div>
    </>
    )
}