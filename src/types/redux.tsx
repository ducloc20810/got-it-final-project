import React from "react";
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
  Children: React.ReactNode;
  // CloseButton: React.ReactNode;
  // SubmitButton: React.ReactNode;
  closeHandle: Function;
};
