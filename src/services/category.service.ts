import { itemsPerPage } from 'utils/variables';
import helper from './helper';

const API_URL = `${process.env.REACT_APP_BACK_END_URL}/categories`;

export type CategoryPayload = {
  name: string;
  description: string;
  imageUrl: string;
};

const CategoryService = {
  getCategories(offset = 0, limit: number = itemsPerPage) {
    const url = `${API_URL}?offset=${offset}&limit=${limit}`;
    return helper.get(url);
  },

  createCategories(payload: CategoryPayload) {
    return helper.postWithAuthentication(API_URL, payload);
  },

  editCategory(id: string, payload: CategoryPayload) {
    return helper.putWithAuthentication(`${API_URL}/${id}`, payload);
  },
};

export default CategoryService;
