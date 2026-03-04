import { useEffect, useState } from "react"
import style from "./Filters.module.css"
import { basename, GOODS } from "../../consts"

export const Filters = (props) => {
    
    const {items, setItems, searchedItems, setSearchedItems} = props
    const [activeModel, setActiveModel] = useState(null)
    const [activeCategory, setActiveCategory] = useState(null)
    const [activeSorting, setActiveSorting] = useState({})
    let [modelOpen, setModelOpen] = useState(false)
    let [categoryOpen, setCategoryOpen] = useState(false)
    let [sortingOpen, setSortingOpen] = useState(false)
    const availableModels = Array.from(new Set(items.map(p => p.carModel)));
    const availableCategory = Array.from(new Set(items.map(p => p.category)));
    const availableSorting = [{key:"increasing", name:"По возрастанию: Цена"}, {key:"decreasing", name:"По убыванию: Цена"}]

    const setSorting = (type) => {
        if(type === "increasing"){
            setSearchedItems(prev => {
                const sortedItems = [...prev].sort((a,b) => a.price - b.price)
                return [...sortedItems]
            })
        }
        else if(type === "decreasing"){
            setSearchedItems(prev => {
                const sortedItems = [...prev].sort((a,b) => b.price - a.price)
                return [...sortedItems]
            })
        }
        else{
            setSearchedItems(prev => {
                if(activeModel === null && activeCategory === null){
                    return items.map(el => {
                        return el
                    })
                }
                else if(activeModel !== null && activeCategory === null){
                    const filteredItems = items.filter(el => el.carModel === activeModel)
                    return [...filteredItems]
                }
                else if(activeModel === null && activeCategory !== null){
                    const filteredItems = items.filter(el => el.category === activeCategory)
                    return [...filteredItems]
                }
                else{
                    const filteredItems = items.filter(el => el.carModel === activeModel && el.category === activeCategory)
                    return [...filteredItems]
                }
            })
        }
    } 

    useEffect(() => {
        setSearchedItems(prev => {
            if(activeModel === null && activeCategory === null){
                return items.map(el => {
                    return el
                })
            }
            else if(activeModel !== null && activeCategory === null){
                const filteredItems = items.filter(el => el.carModel === activeModel)
                return [...filteredItems]
            }
            else if(activeModel === null && activeCategory !== null){
                const filteredItems = items.filter(el => el.category === activeCategory)
                return [...filteredItems]
            }
            else{
                const filteredItems = items.filter(el => el.carModel === activeModel && el.category === activeCategory)
                return [...filteredItems]
            }
        })
    }, [activeModel, activeCategory])

    return(
        <div className={style.filtersContainer}>
            <div className={style.filter}>
                <div className={style.filterField}>
                    <div>
                        <span style={{fontSize:activeModel === null ? "16px" : "12px", transition:"all 300ms ease"}}>Модель</span>
                        <p>{activeModel}</p>
                    </div>
                    <img className={`${style.chevron} ${modelOpen?style.active:""}`} onClick={() => {setModelOpen(modelOpen = !modelOpen ), setCategoryOpen(false) , setSortingOpen(false)}} src={`${basename}/img/chevron.svg`} />
                </div>
                <ul className={style.filterOption} style={{display:modelOpen?"flex":"none"}}>
                    {availableModels.map(el => (
                        <div className={style.option}>
                            <li onClick={()=> setActiveModel(el) }>{el}</li>
                            {activeModel === el?<div className={style.closeButton} onClick={() => {setActiveModel(null), setModelOpen(modelOpen = !modelOpen)}}>X</div>:""}
                        </div>
                    ))}
                </ul>
            </div>
            <div className={style.filter}>
                <div className={style.filterField}>
                    <div>
                        <span style={{fontSize:activeCategory === null ? "16px" : "12px", transition:"all 300ms ease"}}>Запчасть</span>
                        <p>{activeCategory}</p>
                    </div>
                    <img className={`${style.chevron} ${categoryOpen?style.active:""}`} onClick={() => {setCategoryOpen(categoryOpen = !categoryOpen), setModelOpen(false), setSortingOpen(false)}} src={`${basename}/img/chevron.svg`} />
                </div>
                <ul className={style.filterOption} style={{display:categoryOpen?"flex":"none"}}>
                    {availableCategory.map(el => (
                        <div className={style.option}>
                            <li onClick={()=> setActiveCategory(el) }>{el}</li>
                            {activeCategory === el?<div className={style.closeButton} onClick={() => {setActiveCategory(null), setCategoryOpen(categoryOpen = !categoryOpen)}}>X</div>:""}
                        </div>
                    ))}
                </ul>  
            </div>
            <div className={style.filter}>
                <div className={style.filterField}>
                    <div>
                        <span style={{fontSize:activeSorting.key === "increasing" || activeSorting.key === "decreasing"   ? "12px" : "16px", transition:"all 300ms ease"}}>Сортировка</span>
                        <p>{activeSorting.name}</p>
                    </div>
                    <img className={`${style.chevron} ${sortingOpen?style.active:""}`} onClick={() => {setSortingOpen(sortingOpen = !sortingOpen), setModelOpen(false), setCategoryOpen(false)}} src={`${basename}/img/chevron.svg`} />
                </div>
                <ul className={style.filterOption} style={{display:sortingOpen?"flex":"none"}}>
                    {availableSorting.map(el => (
                        <div className={style.option}>
                            <li key={el.key} onClick={()=> {setActiveSorting(el), setSorting(el.key)} } >{el.name}</li>
                            {activeSorting.key === el.key ?<div className={style.closeButton} onClick={() => {setActiveSorting({}), setSorting(null), setSortingOpen(sortingOpen = !sortingOpen)}}>X</div>:""}
                        </div>
                    ))}
                </ul>  
            </div>
        </div>
    )
}