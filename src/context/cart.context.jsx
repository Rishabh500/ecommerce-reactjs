import { createContext, useEffect, useReducer, useState } from "react";
import { createAction } from "../utils/reducers/reducers.utils";

//Helper Functions
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

const CART_ACTION_TYPES = {
  SET_CART_ITEM: "SET_CART_ITEM",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducers = (state, action) => {
  let { payload, type } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEM:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error();
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducers, INITIAL_STATE);

  const updateCartItemsReducer = (cartItems) => {
    const cartCount = [...cartItems].reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const cartTotal = [...cartItems].reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEM,
      payload: {
        cartItems,
        cartCount,
        cartTotal,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCardItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (productToRemove) => {
    const newCartItems = decreaseItemFromCart(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction("SET_IS_CART_OPEN",  bool ));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
//   cartCount: 0,
//   removeItemToCart: () => {},
//   clearItemFromCart: () => {},
// });

// export const CartProvider = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setItemtoCart] = useState([]);
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const newCartCount = cartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity,
//       0
//     );
//     setCartCount(newCartCount);
//   }, [cartItems]);

//   const addItemToCart = (productToAdd) => {
//     setItemtoCart(addCardItem(cartItems, productToAdd));
//   };

//   const removeItemToCart = (productToRemove) => {
//     setItemtoCart(decreaseItemFromCart(cartItems, productToRemove));
//   };

//   const clearItemFromCart = (cartItemToRemove) => {
//     setItemtoCart(removeCartItem(cartItems, cartItemToRemove));
//   };
//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     addItemToCart,
//     cartItems,
//     cartCount,
//     removeItemToCart,
//     clearItemFromCart,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
