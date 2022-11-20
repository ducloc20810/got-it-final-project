export type CategoriesDataType = {
  total_items: number;
  items: Array<CategoryType>;
};

export type CategoryType = {
  description: string;
  id: number;
  image_url: string;
  name: string;
};
