import helper from "./helper";
import { itemsPerPage } from "utils/variables";

const API_URL = `${process.env.REACT_APP_BACK_END_URL}/categories`;

type CategoryPayload = {
  name?: string;
  description?: string;
  image_url?: string;
};

const CategoryService = {
  getCategories(offset: number = 0, limit: number = itemsPerPage) {
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
