import CategoryService from "services/category.service";
import { handleAsyncAction } from "utils/library";
import { TypedDispatch } from "./../store";

export const categoryActions = {
  FETCH_CATEGORY_LIST: "FETCH_CATEGORY_LIST",
};

export const fetchCategoryList =
  (offset: number) => (dispatch: TypedDispatch) =>
    handleAsyncAction(dispatch, categoryActions.FETCH_CATEGORY_LIST, () =>
      CategoryService.getCategories(offset)
    );
