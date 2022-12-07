import { Breadcrumb } from 'types/redux';

export const BreadcrumbActions = {
  SET_BREADCRUMB: 'SET_BREADCRUMB',
  ADD_BREADCRUMB: 'ADD_BREADCRUMB',
};

export const setBreadcrumb = (payload:Breadcrumb) => ({
  type: BreadcrumbActions.SET_BREADCRUMB,
  payload,
});

export const addBreadcrumb = (payload:Breadcrumb) => ({
  type: BreadcrumbActions.ADD_BREADCRUMB,
  payload,
});
