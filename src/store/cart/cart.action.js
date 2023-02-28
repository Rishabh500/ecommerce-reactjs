import { createAction } from "../../utils/reducers/reducers.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
};

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

export const addItemToCartAction = (cartItems,productToAdd) => {
  const newCartItems = addCardItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
};

export const removeItemToCartAction = (cartItems,productToRemove) => {
  const newCartItems = decreaseItemFromCart(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
};

export const clearItemFromCartAction = (cartItems,cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
};
