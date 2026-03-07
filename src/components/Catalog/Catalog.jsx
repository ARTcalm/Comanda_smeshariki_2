import { useCallback, useMemo, useState } from "react"
import { Greeting } from "../Greeting/Greeting"
import { SlideBar } from "../SliderBar/SlideBar"
import style from "./Catalog.module.css"
import ReactPaginate from "react-paginate"
import { Item } from "../Item/Item"
import { Filters } from "../Filters/Filters"
import { useLocation, useNavigate } from "react-router"



export const Catalog = (props) => {

    const {items, setItems, searchedItems, setSearchedItems, handleFavours, handleAddCart, handleAddRecently, plus, minus, cartItems} = props

    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 20
    
    const getPageFromUrl = useCallback(() => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page'), 10);
        return isNaN(page) ? 0 : page - 1; 
    }, [location.search]);
    
    const currentPage = getPageFromUrl();
    const itemOffset = useMemo(() => 
        currentPage * itemsPerPage,
        [currentPage]
    );
    const endOffset = useMemo(() => 
        itemOffset + itemsPerPage, 
        [itemOffset]
    );
    const currentItemsOnPage = useMemo(() => 
        searchedItems.slice(itemOffset, endOffset),
        [searchedItems, itemOffset, endOffset]
    );
    const pageCount = useMemo(() => 
        Math.ceil(searchedItems.length / itemsPerPage),
        [searchedItems.length]
    );
    const handlePageClick = useCallback((event) => {
        const params = new URLSearchParams(location.search);
        params.set('page', event.selected + 1);
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }, [navigate, location]);


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
                forcePage={currentPage}
            />  
        </>
    )
}


