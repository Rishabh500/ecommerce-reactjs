import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { CategoriesContext } from "../../context/categories.context";
import { setCategories } from "../../store/categories/categories.action";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  let Categories = useSelector(selectCategories);
  const [products, setProducts] = useState([]);
  const isLoading = useSelector(selectCategoriesIsLoading);
  useEffect(() => {
    setProducts(Categories[category]);
  }, [category, Categories]);
  return (
    <>
      {Categories?.length > 0 ? (
        <Skeleton count={10} />
      ) : (
        <>
          <h2 className="title"> {category.toUpperCase()}</h2>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="category-container">
              {products &&
                products?.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Category;
