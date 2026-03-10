import { Link } from "react-router";
import style from "./AdminStatisticDisplay.module.css"

export const AdminStatisticDisplay = (props) => {
    
    const {items, cartItems, orders, favoursItems} = props

    const totalItems = items.reduce((sum, item) => sum + (item.storage || 0), 0);
    const lowStock = items.filter(item => item.storage > 0 && item.storage < 10).length;
    const outOfStock = items.filter(item => item.storage === 0).length;

    const stats = {
        totalProducts: items.length,
        inCarts: cartItems.length,
        inFavorites: favoursItems.length,
        activeOrders: orders.filter(order => order.status !== 'Выполнен').length,
        completedOrders: orders.filter(order => order.status === 'Выполнен').length,
        totalItems: totalItems,
        lowStock: lowStock,
        outOfStock: outOfStock
    };

    return(
    <div className={style.statisticPage}>
        <h1>Статистика</h1>
        <div className={style.statsGrid}>
            <div className={style.statCard}>
                <span className={style.statLabel}>Товаров всего</span>
                <span className={style.statValue}>{stats.totalProducts}</span>
            </div>
            <div className={style.statCard}>
                <span className={style.statLabel}>В корзинах</span>
                <span className={style.statValue}>{stats.inCarts}</span>
            </div>
            <div className={style.statCard}>
                <span className={style.statLabel}>В избранном</span>
                <span className={style.statValue}>{stats.inFavorites}</span>
            </div>
            <div className={style.statCard}>
                <span className={style.statLabel}>Активные заказы</span>
                <span className={style.statValue}>{stats.activeOrders}</span>
            </div>
            <div className={style.statCard}>
                <span className={style.statLabel}>Выполненные заказы</span>
                <span className={style.statValue}>{stats.completedOrders}</span>
            </div>
            <div className={style.statCard}>
                <span className={style.statLabel}>Единиц товара</span>
                <span className={style.statValue}>{stats.totalItems}</span>
            </div>
            <Link to={"/admin/ending-goods"}>
                <div className={`${style.statCard} ${style.warning}`}>
                    <span className={style.statLabel}>Заканчиваются</span>
                    <span className={style.statValue}>{stats.lowStock}</span>
                </div>
            </Link>
            <Link to={"/admin/ended-goods"}>
                <div className={`${style.statCard} ${style.danger}`}>
                    <span className={style.statLabel}>Закончились</span>
                    <span className={style.statValue}>{stats.outOfStock}</span>
                </div>
            </Link>
        </div>
    </div>
    )
}