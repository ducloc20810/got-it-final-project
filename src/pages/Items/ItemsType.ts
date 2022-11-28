export type ItemType = {
  id: number;
  description: string;
  imageUrl: string;
  author: {
    id: number;
    name: string;
  };
  categoryId: number;
};

export type ItemsDataType = {
  totalItems: number;
  items: Array<ItemType>;
};

export type ItemPayload = {
  imageUrl:string,
  description: string
}
