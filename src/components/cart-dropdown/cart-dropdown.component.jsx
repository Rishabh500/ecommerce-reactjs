import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';


const CartDropdown = () =>{
    let {cartItems} = useContext(CartContext);
    console.log('cartItems',cartItems)
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item => <CartItem cartItem={item}/>)}
            </div>
            <Button>Go to Checkout</Button>

        </div>
    )
}

export default CartDropdown;