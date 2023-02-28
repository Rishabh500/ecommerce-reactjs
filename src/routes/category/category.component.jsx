import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categories.context";
import { setCategories } from "../../store/categories/categories.action";
import { selectCategories } from "../../store/categories/categories.selector";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  let Categories = useSelector(selectCategories);
  console.log('categories',Categories);
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
