import style from "./AdminStatisticDisplay.module.css"

export const AdminStatisticDisplay = () => {
    
    const stats = {
        totalProducts: 245,
        inCarts: 89,
        inFavorites: 156,
        activeOrders: 23,
        completedOrders: 178,
        totalItems: 3450,
        lowStock: 34,
        outOfStock: 12
    };

    return(
    <div className="statistics-page">
        <h1>Статистика</h1>
        <div className="stats-grid">
            <div className="stat-card">
            <span className="stat-label">Товаров всего</span>
            <span className="stat-value">{stats.totalProducts}</span>
            </div>
            <div className="stat-card">
            <span className="stat-label">В корзинах</span>
            <span className="stat-value">{stats.inCarts}</span>
            </div>
            <div className="stat-card">
            <span className="stat-label">В избранном</span>
            <span className="stat-value">{stats.inFavorites}</span>
            </div>
            <div className="stat-card">
            <span className="stat-label">Активные заказы</span>
            <span className="stat-value">{stats.activeOrders}</span>
            </div>
            <div className="stat-card">
            <span className="stat-label">Выполненные заказы</span>
            <span className="stat-value">{stats.completedOrders}</span>
            </div>
            <div className="stat-card">
            <span className="stat-label">Единиц товара</span>
            <span className="stat-value">{stats.totalItems}</span>
            </div>
            <div className="stat-card warning">
            <span className="stat-label">Заканчиваются</span>
            <span className="stat-value">{stats.lowStock}</span>
            </div>
            <div className="stat-card danger">
            <span className="stat-label">Закончились</span>
            <span className="stat-value">{stats.outOfStock}</span>
            </div>
        </div>
    </div>
    )
}