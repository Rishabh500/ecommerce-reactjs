import { useContext } from "react";
import { CartContext, CartProvider } from "../../context/cart.context";
import Button from "../button/button.component";
import "./product-card.component.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  let {addItemToCart} = useContext(CartContext);
  
  
  const handleOnCartAdd = () =>{
    addItemToCart(product);
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
