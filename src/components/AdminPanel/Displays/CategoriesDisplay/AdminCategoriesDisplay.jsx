import { basename } from "../../../../consts"
import style from "./AdminCategoriesDisplay.module.css"


export const AdminCategoriesDisplay = (props) => {
    
    const {items} = props

    const availableCategories = [...new Set(items.map(item => item.category))]
    const categories = availableCategories.map(category => ({
        name:category,
        items:items.filter(item => item.category === category)
    }))

    // const categories = [
    //     {
    //     name: 'Электроника',
    //     products: [
    //         {
    //         id: 1,
    //         image: 'https://via.placeholder.com/50',
    //         name: 'Смартфон',
    //         model: 'iPhone 13',
    //         price: 79999,
    //         stock: 23
    //         },
    //         {
    //         id: 2,
    //         image: 'https://via.placeholder.com/50',
    //         name: 'Планшет',
    //         model: 'iPad Air',
    //         price: 45999,
    //         stock: 12
    //         }
    //     ]
    //     },
    //     {
    //     name: 'Одежда',
    //     products: [
    //         {
    //         id: 3,
    //         image: 'https://via.placeholder.com/50',
    //         name: 'Футболка',
    //         model: 'Classic White',
    //         price: 1999,
    //         stock: 45
    //         },
    //         {
    //         id: 4,
    //         image: 'https://via.placeholder.com/50',
    //         name: 'Джинсы',
    //         model: 'Slim Fit',
    //         price: 3999,
    //         stock: 28
    //         }
    //     ]
    //     }
    // ];

return (
    <div className={style.categoriesPage}>
      <h1>Категории товаров</h1>
      {categories.map((category, index) => (
        <div key={index} className={style.categorySection}>
          <h2>{category.name}</h2>
          <div className={style.tableWrapper}>
            <table className={style.adminTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Изображение</th>
                  <th>Название</th>
                  <th>Модель</th>
                  <th>Цена за шт.</th>
                  <th>Склад</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><img src={`${basename}${item.image}`} alt={item.name} className={style.itemThumb} /></td>
                    <td>{item.name}</td>
                    <td>{item.carModel}</td>
                    <td>{item.price} ₽</td>
                    <td>{item.storage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}