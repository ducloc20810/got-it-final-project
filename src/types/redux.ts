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
  component: string;
  componentProps: Record<string, unknown>;
  footerContent?: {
    closeButtonContent: string;
    submitButtonContent: string;
    closeButtonHandle: () => void;
    submitButtonHandle: () => void;
  };
  closeHandle: () => void;
};

export type BreadcrumbItem = {
  title: string;
  href: string;
}
export type Breadcrumb = Array<BreadcrumbItem>
