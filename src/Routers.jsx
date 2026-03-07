import { Route, Routes, useLocation, useNavigate } from "react-router";
import { useEffect, useMemo, useRef, useState } from 'react'
import {Header} from "./components/Layout/Header/Header";
import {Footer} from "./components/Layout/Footer/Footer";
import { Catalog } from "./components/Catalog/Catalog";
import {Favours} from "./components/Favour/Favour"
import {Cart} from "./components/Cart/Cart"
import {DeliveryForm} from "./components/DeliveryForm/DeliveryForm"
import GOODS from "./goods.json"
import { ItemPage } from "./components/ItemPage/ItemPage";
import { Profile } from "./components/Profile/Profile";
import { FavourDisplay } from "./components/Profile/Displays/FavoursDisplay/FavoursDisplay";
import { OrdersDisplay } from "./components/Profile/Displays/OrderDisplay/OrdersDisplay";
import { ProfileDisplay } from "./components/Profile/Displays/ProfileDisplay/ProfileDisplay";

export const Routers = () => {

    const [items, setItems] = useState(GOODS)
    const [searchedItems,setSearchedItems] = useState(items)
    const [cartItems, setCartItems] = useState([])
    const [favoursItems, setFavoursItems] = useState([])
    const [recentlyItems, setRecentlyItems] = useState([])
    const [orders, setOrders] = useState([])
    const location = useLocation()


    const handleAddRecently = (item) => {
        const isInArray = recentlyItems.some(el => el.id === item.id)
        if(!isInArray){setRecentlyItems(prev => [item, ...prev])}
    }

    const handleAddCart = (item) => {
        if(item.storage != 0){
            const isInArray = cartItems.some(el => el.id === item.id)
            if(!isInArray){
                setCartItems(prev => [...prev, item])
                setCartItems(cartItems => {
                    return cartItems.map(el => {
                        if(el.id === item.id){
                            return {...el, cartCount:1}
                        }
                        return el
                })})
            }
        }
        else{
            alert("Товара нет на складе, не волнуйтесь, пополнение скоро будет, приносим свои извинения!")
        }
    }
    
    const handleFavours = (item) =>{
        setSearchedItems(items => {
            return items.map(el => {
                if(item.id === el.id){
                    return {...el, favours: !el.favours}
                }
                return el
            })
        })
        setItems(items => {
            return items.map(el => {
                if(item.id === el.id){
                    return {...el, favours: !el.favours}
                }
                return el
            })
        })        
        setCartItems(cartItems => {
            return cartItems.map(el => {
                if(item.id === el.id){
                    return {...el, favours: !el.favours}
                }
                return el
            })
        })
        setRecentlyItems(items => {
            return items.map(el => {
                if(item.id === el.id){
                    return {...el, favours: !el.favours}
                }
                return el
            })
        })
    }

    const DeleteCartItems = (id) =>{
          setCartItems(cartItems => cartItems.filter(el=> el.id !== id))
    }

    const plus = (item) => {
        setCartItems(cartItems => {
            return cartItems.map(el =>{
                if(el.id === item.id){
                    return {
                        ...el,
                        cartCount: el.cartCount + 1 > el.storage  ? el.cartCount : el.cartCount + 1
                    }
                }
                return el
            })
        })
        cartItems.map(el => {
                if(el.id === item.id){
                    if(el.cartCount === el.storage){alert("Вы заказали максимум товара")}
                }
        })
    }
    const minus = (item) =>{
        cartItems.map(el => {
            if(el.id === item.id){
                if(el.cartCount > 1){
                    setCartItems(prev => {
                        return prev.map(prevEl => {
                            if(prevEl.id === el.id){
                                return {
                                    ...prevEl,
                                    cartCount: prevEl.cartCount-1
                                }
                            }
                            return prevEl
                        })
                    })
                }
                else{
                    setCartItems(cartItems => cartItems.filter(el => el.id !== item.id))
                }
            }
        })
    }

    useEffect(() => {
        window.scrollTo(0,0)
    }, [location])

    useEffect(() => {
        setFavoursItems(prev => {
            const favouredIds = new Set(
            items
                .filter(item => item.favours)
                .map(item => item.id)
            );

            const filteredPrev = prev.filter(item => favouredIds.has(item.id));

            const existingIds = new Set(filteredPrev.map(el => el.id));
            const newItems = items.filter(item => 
            item.favours && !existingIds.has(item.id)
            );
            
            return [...filteredPrev, ...newItems];
        });
    }, [items])


    return(
        <>
        <Header searchedItems={searchedItems} setSearchedItems={setSearchedItems} cartItems={cartItems} favoursItems={favoursItems} />        
        <div className="main" >
            <Routes>
                <Route index element={<Catalog items={items} setItems={setItems} searchedItems={searchedItems} setSearchedItems={setSearchedItems} handleFavours={handleFavours} handleAddCart={handleAddCart} handleAddRecently={handleAddRecently} plus={plus} minus={minus} cartItems={cartItems} />} />
                <Route path={"product/:category/:id"} element={<ItemPage items={items} handleFavours={handleFavours} handleAddCart={handleAddCart} plus={plus} minus={minus} cartItems={cartItems} />}/>
                <Route path={"aboutus"} element={<div>ABOUTUS</div>} />
                <Route path={"contacts"} element={<div>CONTACTS</div>} />
                <Route path={"profile"} element={<Profile />} >
                    <Route index element={<ProfileDisplay orders={orders} favoursItems={favoursItems} recentlyItems={recentlyItems} handleFavours={handleFavours} handleAddCart={handleAddCart} handleAddRecently={handleAddRecently} plus={plus} minus={minus} cartItems={cartItems} /> } />
                    <Route path={"orders"} element={<OrdersDisplay orders={orders}/>} />
                    <Route path={"favours"} element={<FavourDisplay favoursItems={favoursItems} handleAddCart={handleAddCart} handleFavours={handleFavours} handleAddRecently={handleAddRecently} plus={plus} minus={minus} cartItems={cartItems} />}/>
                    <Route path={"*"} element={<div>NICHEGO</div>} />
                </Route>
                <Route path={"cart"}>
                    <Route index element={<Cart cartItems={cartItems} handleFavours={handleFavours} DeleteCartItems={DeleteCartItems} plus={plus} minus={minus} />} />
                    <Route path={"delivery-form"} element={<DeliveryForm orders={orders} setOrders={setOrders} cartItems={cartItems} setCartItems={setCartItems} setItems={setItems} />} />
                    <Route path={"*"} element={<div>NICHEGO</div>} />
                </Route>
                <Route path={"favours"} element={<Favours favoursItems={favoursItems} cartItems={cartItems} handleFavours={handleFavours} handleAddCart={handleAddCart} handleAddRecently={handleAddRecently} plus={plus} minus={minus} />} />
                <Route path={"*"} element={<div>NICHEGO</div>} />
            </Routes>
        </div>
        <Footer />
        </>
    )
}

