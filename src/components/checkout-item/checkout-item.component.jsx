import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartContext } from '../../context/cart.context';
import { addItemToCartAction, clearItemFromCartAction, removeItemToCartAction } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';


import './checkout.item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  // const { clearItemFromCart, addItemToCart, removeItemToCart } =
  //   useContext(CartContext);

  let cartItems = useSelector(selectCartItems);
  let dispatch = useDispatch();

  const clearItemHandler = () => dispatch(clearItemFromCartAction(cartItems,cartItem));
  const addItemHandler = () => dispatch(addItemToCartAction(cartItems,cartItem));
  const removeItemHandler = () => dispatch(removeItemToCartAction(cartItems,cartItem));

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'> {name} </span>
      <span className='quantity'>
        <div className='arrow' onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className='price'> {price}</span>
      <div className='remove-button' onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;