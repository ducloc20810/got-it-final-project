import { ReactNode } from "react";

export type User = {
  name?: string;
  id?: string;
  isLoggedIn?: boolean;
};

export type Message = {
  status?: number | null;
  message?: string;
  error?: {
    message?: string;
    data?: any;
  } | null;
};

export type Modal = {
  isLoading: boolean;
  isOpen: boolean;
  title: string;
  children: ReactNode;
  closeButtonContent: string;
  submitButtonContent: string;
  closeHandle: Function;
  submitHandle: Function;
};
