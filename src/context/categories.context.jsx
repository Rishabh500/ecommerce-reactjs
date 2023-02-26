import { createContext, useEffect, useState } from "react";
import SHOP_DATA from '../shop-data.js';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext =createContext({
    Categories: {},
    setCategories: () => null
});

export const CategoriesProvider = ({children}) =>{
    const [Categories, setCategories] = useState([]);
    useEffect(()=>{
        const getCategoriesMap = async () => {
           const categoryMap =  await getCategoriesAndDocuments()
            console.log(categoryMap)
            setCategories(categoryMap)
        }
        getCategoriesMap();
        // addCollectionAndDocuments('categories',SHOP_DATA)
    },[]);
    
    let value = {Categories, setCategories};

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}