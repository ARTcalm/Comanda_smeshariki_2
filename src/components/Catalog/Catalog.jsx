import { useState } from "react"
import { Greeting } from "../Greeting/Greeting"
import { SlideBar } from "../SliderBar/SlideBar"
import style from "./Catalog.module.css"
import ReactPaginate from "react-paginate"
import { Item } from "../Item/Item"
import { Filters } from "../Filters/Filters"



export const Catalog = (props) => {

    const {items, setItems, searchedItems, setSearchedItems, handleFavours, handleAddCart, handleAddRecently, plus, minus, cartItems} = props

    const itemsPerPage = 20
    const [itemOffset, setItemOffset] = useState(0)
    const endOffset = itemOffset + itemsPerPage 
    const currentItemsOnPage = searchedItems.slice(itemOffset, endOffset)

    const pageCount = Math.ceil(searchedItems.length/itemsPerPage)
    const handlePageClick = (event) => {
        const newOffset = (event.selected  * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };
    return(
        <>
            <Greeting />
            <SlideBar />
            <h1 id={style.title}>Каталог</h1>
            <Filters items={items} setItems={setItems} searchedItems={searchedItems} setSearchedItems={setSearchedItems} />
            <div className={style.items}>
                {currentItemsOnPage.length === 0? 
                <h1 style={{color:"white"}}>Ничего не найдено</h1>
                :
                currentItemsOnPage.map(el => (
                    <Item handleFavours={handleFavours} handleAddCart={handleAddCart} handleAddRecently={handleAddRecently} plus={plus} minus={minus} cartItems={cartItems} item={el} key={el.id}/>
                ))}
            </div>
            <ReactPaginate 
                breakLabel="..."
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< "
                renderOnZeroPageCount={null}
                containerClassName={style.containerClassName}
                pageClassName={style.pageClassName}
                pageLinkClassName={style.pageLinkClassName}
                pageLabelBuilder={style.pageLabalBuilder}
                nextClassName={style.nextContainer}
                breakClassName={style.break}
                previousClassName={style.previousContainer}
            />  
        </>
    )
}


