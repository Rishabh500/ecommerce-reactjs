import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartContext, CartProvider } from "../../context/cart.context";
import { addItemToCartAction } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button from "../button/button.component";
import "./product-card.component.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  // let {addItemToCart} = useContext(CartContext);
  
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const handleOnCartAdd = () =>{
    // addItemToCart(product);
    dispatch(addItemToCartAction(cartItems,product));

  }
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt="product" />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={"inverted"} onClick={handleOnCartAdd}>Add to cart</Button>
    </div>
  );
};

export default ProductCard;
