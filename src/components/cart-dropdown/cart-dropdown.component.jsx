import "./cart-dropdown.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropdown = () => {
  // let { cartItems } = useContext(CartContext);
  
  const cartItems = useSelector(selectCartItems);

  console.log("cartItems", cartItems);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length == 0 ? <>Empty Cart</>:
        <>
            {cartItems.map((item) => (
          <CartItem cartItem={item} />
        ))}
        </>}
    
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
        <Link to="checkout">Go to Checkout</Link>
      </Button>
    </div>
  );
};

export default CartDropdown;
