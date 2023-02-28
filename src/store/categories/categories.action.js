import { async } from "@firebase/util";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducers/reducers.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const setCategories = (categories) => {
  return createAction('SET_CATEGORIES_MAP', categories);
};


export const fetchCategories = () => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
};

export const fetchCategoriesSuccess = (categories) => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCESS,categories);
};

export const fetchCategoriesFail = (error) => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL,error);
};

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategories())

  try {
    const categoryMap =  await getCategoriesAndDocuments()
    console.log('Inside ',categoryMap)
    dispatch(fetchCategoriesSuccess(categoryMap))

  }
  catch(error) {
    dispatch(fetchCategoriesFail(error))
  }

  // return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL,error);
};