export type User = {
  name?: string;
  id?: string;
  isLoggedIn?: boolean;
};

export type Message = {
  status: number | null;
  message: string;
  data?: object;
};
