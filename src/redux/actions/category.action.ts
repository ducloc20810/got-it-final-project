import { ITEMS_PER_PAGE } from 'constants/pagination';
import { EndPoints } from 'constants/api';
import helper from 'services/helper';
import { CategoryPayload } from 'pages/Categories/CategoriesType';
import { handleAsyncAction } from './utils';
import { TypedDispatch } from '../store';

export const CategoryActions = {
  FETCH_CATEGORY_DETAIL: 'FETCH_CATEGORY_DETAIL',
  FETCH_CATEGORY_LIST: 'FETCH_CATEGORY_LIST',
  CREATE_CATEGORY: 'CREATE_CATEGORY',
  EDIT_CATEGORY: 'EDIT_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
};

export const fetchCategoryDetail = (id:number) => (dispatch: TypedDispatch) => {
  const url = `${EndPoints.CATEGORIES}/${id}`;
  return handleAsyncAction(dispatch, CategoryActions.FETCH_CATEGORY_DETAIL, () => helper.get(url));
};

export const fetchCategoryList = (pageNumber:number, limit: number = ITEMS_PER_PAGE) =>
  (dispatch: TypedDispatch) => {
    const offset = (pageNumber - 1) * limit;
    const url = `${EndPoints.CATEGORIES}?offset=${offset}&limit=${limit}`;

    return handleAsyncAction(dispatch, CategoryActions.FETCH_CATEGORY_LIST, () => helper.get(url));
  };

export const createCategory = (payload: CategoryPayload) => (dispatch: TypedDispatch) =>
  handleAsyncAction(dispatch, CategoryActions.CREATE_CATEGORY, () =>
    helper.postWithAuthentication(EndPoints.CATEGORIES, payload));

export const editCategory = (id: number, payload: CategoryPayload) => (dispatch: TypedDispatch) => {
  const url = `${EndPoints.CATEGORIES}/${id}`;
  return handleAsyncAction(dispatch, CategoryActions.EDIT_CATEGORY, () =>
    helper.putWithAuthentication(url, payload));
};

export const removeCategory = (id: number) => (dispatch:TypedDispatch) => {
  const url = `${EndPoints.CATEGORIES}/${id}`;
  return handleAsyncAction(dispatch, CategoryActions.DELETE_CATEGORY, () =>
    helper.deleteWithAuthentication(url));
};
