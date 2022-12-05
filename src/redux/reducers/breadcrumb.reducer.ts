import { RootState } from 'redux/store';
import { BreadcrumbActions } from 'redux/actions/breadcrumb.action';
import { Breadcrumb } from 'types/redux';

type Action = {
  type:string;
  payload: Breadcrumb
}

const initialState: Breadcrumb = [];

const breadcrumbReducer = (state:Breadcrumb = initialState, action:Action) => {
  const { type, payload } = action;
  switch (type) {
    case BreadcrumbActions.SET_BREADCRUMB:
      return payload;

    case BreadcrumbActions.ADD_BREADCRUMB:
      return [...state, ...payload];

    default:
      return state;
  }
};

export const breadcrumbSelector = (state: RootState) => state.breadcrumb;

export default breadcrumbReducer;
