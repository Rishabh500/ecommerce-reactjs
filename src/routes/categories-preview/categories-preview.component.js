import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categories.context";
import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  // let { Categories } = useContext(CategoriesContext);
  let categories = useSelector((state)=> state.categories.Categories);
  console.log('categories',categories);
  return (
    <>
      {Object.keys(categories).map((title) => {
        const products = categories[title];
        return <CategoryPreview key={title} title={title} products={products} />;
      })}
    </>
  );
};

export default CategoriesPreview;
