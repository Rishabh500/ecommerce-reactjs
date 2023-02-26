import { createContext, useEffect, useState } from "react";

const addCardItem = (cartItems, productsToAdd) => {
  const existingCartItem = cartItems.findIndex(
    (cartItem) => cartItem.id === productsToAdd.id
  );

  if (existingCartItem > -1) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productsToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...productsToAdd, quantity: 1 }];
};

const decreaseItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => {
      return cartItem.id !== cartItemToRemove.id;
    });
  }

  return cartItems.map((cartItem) => {
    return cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

const removeCartItem = (cartItems, itemToRemove) => {
  return cartItems.filter((cartItem) => {
    return cartItem.id !== itemToRemove.id;
  });
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setItemtoCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setItemtoCart(addCardItem(cartItems, productToAdd));
  };

  const removeItemToCart = (productToRemove) => {
    setItemtoCart(decreaseItemFromCart(cartItems, productToRemove));
  };

  const clearItemFromCart = (cartItemToRemove) => {
    setItemtoCart(removeCartItem(cartItems, cartItemToRemove));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
