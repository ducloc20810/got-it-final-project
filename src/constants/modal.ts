import ItemCreateForm from 'components/Items/ItemCreateForm';
import CategoryCreateForm from 'components/Categories/CategoryCreateForm';
import DeleteWarning from 'components/Common/DeleteWarning/DeleteWarning';
import AuthWarning from 'components/Common/AuthWarning/AuthWarning';
import AuthorWarning from 'components/Common/AuthorWarning/AuthorWarning';

export const ModalList = {
  CREATE_CATEGORY: 'createCategory',
  EDIT_CATEGORY: 'editCategory',
  CREATE_ITEM: 'createItem',
  EDIT_ITEM: 'editItem',
  DELETE_WARNING: 'deleteWarning',
  AUTH_WARNING: 'authWarning',
  AUTHOR_WARNING: 'authorWarning',
};

export const ModalLookUp: Record<string, any> = {
  createCategory: CategoryCreateForm,
  editCategory: CategoryCreateForm,
  createItem: ItemCreateForm,
  editItem: ItemCreateForm,
  deleteWarning: DeleteWarning,
  authWarning: AuthWarning,
  authorWarning: AuthorWarning,
};
