import { ReducerAction } from "types/reducer";

export type CategoryContextType = {
  categories: [];
  isEdit: Boolean;
  isCreate: Boolean;
  isDelete: Boolean;
  isLoading: Boolean;
};

export const categoryAction = {
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_LOADING: "SET_LOADING",
  SET_CREATE: " SET_CREATE",
  SET_EDIT: "SET_EDIT",
  SET_DELETE: "SET_DELETE",
};

export const initState: CategoryContextType = {
  categories: [],
  isEdit: false,
  isCreate: false,
  isDelete: false,
  isLoading: false,
};

export const categoryReducer = (
  state: CategoryContextType,
  action: ReducerAction
) => {
  switch (action.type) {
    case categoryAction.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case categoryAction.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case categoryAction.SET_DELETE:
      return { ...state, isDelete: action.payload };
    case categoryAction.SET_EDIT:
      return { ...state, isEdit: action.payload };
    case categoryAction.SET_CREATE:
      return { ...state, isCreate: action.payload };
    default:
      return state;
  }
};
