import { createAction } from "../../utils/reducers/reducers.utils";

export const setCategories = (categories) => {
  return createAction('SET_CATEGORIES_MAP', categories);
};
