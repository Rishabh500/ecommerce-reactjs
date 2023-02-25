import { createContext, useEffect, useState } from "react";

const addCardItem = (cartItems, productsToAdd) =>{

    const existingCartItem = cartItems.findIndex((cartItem)=>cartItem.id===productsToAdd.id);

    if(existingCartItem > -1) {

        return cartItems.map((cartItem)=> {
           return cartItem.id === productsToAdd.id ? {...cartItem, quantity:cartItem.quantity +1}:cartItem
        })
    }

    return [...cartItems, {...productsToAdd, quantity : 1}]; 
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: ()=>{},
    cartCount: 0
});

export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setItemtoCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(()=>{       
        const newCartCount = cartItems.reduce((total, cartItem)=> total+cartItem.quantity,0);
        console.log('newCartCount',newCartCount);
        setCartCount(newCartCount);
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setItemtoCart(addCardItem(cartItems, productToAdd));
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}