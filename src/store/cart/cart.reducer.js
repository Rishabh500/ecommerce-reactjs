import { CART_ACTION_TYPES } from "./cart.types";

export const cartReducers = (state = INITIAL_STATE, action = {}) => {
    let { payload, type } = action;
  
    switch (type) {
      case CART_ACTION_TYPES.SET_CART_ITEM:
        return {
          ...state,
          cartItems: payload,
        };
  
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:
        return {
          ...state,
          isCartOpen: payload,
        };
      default:
        return state;
    }
  };
  
  const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
  };