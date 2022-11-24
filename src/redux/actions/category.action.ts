import CategoryService from 'services/category.service';
import { handleAsyncAction } from 'utils/library';
import { CategoryPayload } from '../../services/category.service';
import { TypedDispatch } from '../store';

export const CategoryActions = {
  FETCH_CATEGORY_LIST: 'FETCH_CATEGORY_LIST',
  CREATE_CATEGORY: 'CREATE_CATEGORY',
};

export const fetchCategoryList = (offset: number) => (dispatch: TypedDispatch) => handleAsyncAction(dispatch, CategoryActions.FETCH_CATEGORY_LIST, () => CategoryService.getCategories(offset));

export const createCategory = (payload: CategoryPayload) => (dispatch: TypedDispatch) => handleAsyncAction(dispatch, CategoryActions.CREATE_CATEGORY, () => CategoryService.createCategories(payload));
