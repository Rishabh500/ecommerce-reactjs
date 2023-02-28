import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectCartIsOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () =>{
    // const {cartCount} = useContext(CartContext);
    // console.log(cartCount);

    let dispatch = useDispatch()
    let cartOpenvalue = useSelector(selectCartIsOpen);
    let cartCount = useSelector(selectCartCount);

    
    console.log(cartOpenvalue);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!cartOpenvalue));

    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    )
}

export default CartIcon;