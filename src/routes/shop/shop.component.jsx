import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  fetchCategoriesAsync,
  setCategories,
} from "../../store/categories/categories.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.component.scss";

const Shop = () => {
  const dispatch = useDispatch();
  //   useEffect(()=>{
  //     const getCategoriesMap = async () => {
  //        const categoryMap =  await getCategoriesAndDocuments()
  //         dispatch(setCategories(categoryMap))
  //        console.log(categoryMap)
  //     }
  //     getCategoriesMap();
  // },[]);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
