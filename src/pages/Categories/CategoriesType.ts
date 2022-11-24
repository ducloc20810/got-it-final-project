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
