export type CategoryType = {
  description: string;
  id: number;
  imageUrl: string;
  name: string;
};
export type CategoriesDataType = {
  totalItems: number;
  items: Array<CategoryType>;
};

export type CategoryPayload = {
  name: string;
  description: string;
  imageUrl: string;
};
