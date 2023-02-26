import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categories.context";
import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  let { Categories } = useContext(CategoriesContext);
  return (
    <>
      {Object.keys(Categories).map((title) => {
        const products = Categories[title];
        return <CategoryPreview key={title} title={title} products={products} />;
      })}
    </>
  );
};

export default CategoriesPreview;
