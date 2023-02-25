import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { ProductsContext } from "../../context/products.context";
import './shop.component.scss';
const Shop = () => {
  let { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product,i) => {
        return <ProductCard key={i} product={product} />;
      })}
    </div>
  );
};

export default Shop;
