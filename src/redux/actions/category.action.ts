import CategoryService from 'services/category.service';
import { handleAsyncAction } from 'utils/library';
import { CategoryPayload } from '../../services/category.service';
import { TypedDispatch } from '../store';

export const categoryActions = {
  FETCH_CATEGORY_LIST: 'FETCH_CATEGORY_LIST',
  CREATE_CATEGORY: 'CREATE_CATEGORY',
};

export const fetchCategoryList = (offset: number) => (dispatch: TypedDispatch) => handleAsyncAction(dispatch, categoryActions.FETCH_CATEGORY_LIST, () => CategoryService.getCategories(offset));

export const createCategory = (payload: CategoryPayload) => (dispatch: TypedDispatch) => handleAsyncAction(dispatch, categoryActions.CREATE_CATEGORY, () => CategoryService.createCategories(payload));
