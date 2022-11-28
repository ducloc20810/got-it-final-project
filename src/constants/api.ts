export const EndPoints = {
  REGISTER: '/users',
  LOGIN: '/auth',
  GET_USER_INFO: '/users/me',
  CATEGORIES: '/categories',
  getItemEndPoint: (categoryId:number|string) => `/categories/${categoryId}/items`,
};
