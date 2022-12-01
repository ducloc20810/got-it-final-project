import ItemCreateForm from 'components/Items/ItemCreateForm';
import CategoryCreateForm from 'components/Categories/CategoryCreateForm';
import DeleteWarning from 'components/Common/DeleteWarning/DeleteWarning';
import AuthWarning from 'components/Common/AuthWarning/AuthWarning';

export const ModalList = {
  CREATE_CATEGORY: 'createCategory',
  EDIT_CATEGORY: 'editCategory',
  CREATE_ITEM: 'createItem',
  DELETE_WARNING: 'deleteWarning',
  AUTH_WARNING: 'authWarning',
};

export const ModalLookUp: Record<string, any> = {
  createCategory: CategoryCreateForm,
  editCategory: CategoryCreateForm,
  createItem: ItemCreateForm,
  deleteWarning: DeleteWarning,
  authWarning: AuthWarning,
};
