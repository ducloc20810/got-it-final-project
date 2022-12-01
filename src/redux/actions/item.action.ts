import { EndPoints } from 'constants/api';
import { ITEMS_PER_PAGE } from 'constants/pagination';
import { TypedDispatch } from 'redux/store';
import helper from 'services/helper';
import { ItemPayload } from '../../pages/Items/ItemsType';
import { handleAsyncAction } from './utils';

export const ItemActions = {
  FETCH_ITEM_DETAIL: 'FETCH_ITEM_DETAIL',
  FETCH_ITEM_LIST: 'FETCH_ITEM_LIST',
  CREATE_ITEM: 'CREATE_ITEM',
  EDIT_ITEM: 'EDIT_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
};

export const fetchItemDetail = (categoryId: number, id:number) =>
  (dispatch: TypedDispatch) => {
    const url = `${EndPoints.getItemEndPoint(categoryId)}/${id}`;
    return handleAsyncAction(dispatch, ItemActions.FETCH_ITEM_DETAIL, () => helper.get(url));
  };

export const fetchItemList = (categoryId: number, pageNumber: number, limit: number = ITEMS_PER_PAGE) =>
  (dispatch: TypedDispatch) => {
    const offset = (pageNumber - 1) * limit;
    const url = `${EndPoints.getItemEndPoint(categoryId)}?offset=${offset}&limit=${limit}`;

    return handleAsyncAction(dispatch, ItemActions.FETCH_ITEM_LIST, () => helper.get(url));
  };

export const createItem = (categoryId: number, payload: ItemPayload) => (dispatch: TypedDispatch) =>
  handleAsyncAction(dispatch, ItemActions.CREATE_ITEM, () =>
    helper.postWithAuthentication(EndPoints.getItemEndPoint(categoryId), payload));

export const editItem = (categoryId: number, id: number, payload: ItemPayload) => (dispatch: TypedDispatch) => {
  const url = `${EndPoints.getItemEndPoint(categoryId)}/${id}`;
  return handleAsyncAction(dispatch, ItemActions.EDIT_ITEM, () =>
    helper.putWithAuthentication(url, payload));
};

export const removeItem = (categoryId:number, id: number) => (dispatch: TypedDispatch) => {
  const url = `${EndPoints.getItemEndPoint(categoryId)}/${id}`;
  return handleAsyncAction(dispatch, ItemActions.DELETE_ITEM, () =>
    helper.deleteWithAuthentication(url));
};
