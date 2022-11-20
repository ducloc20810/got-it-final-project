export type itemsDataType = {
  total_items: number;
  items: Array<itemDetailType>;
};

export type itemDetailType = {
  id: number;
  description: string;
  image_url: string;
  author: {
    id: number;
    name: string;
  };
  category_id: number;
};
