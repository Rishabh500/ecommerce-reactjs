import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categories.context";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { Categories } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(Categories[category]);
  }, [category, Categories]);
  return (
    <>
      <h2 className="title"> {category.toUpperCase()}</h2>

      <div className="category-container">
        {products &&
          products?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </>
  );
};

export default Category;
