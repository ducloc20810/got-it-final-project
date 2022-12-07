import { useEffect, useState } from 'react';
import { Button } from '@ahaui/react';
import { useAuthWarning, useCloseModal, useAppSelector, useTypedDispatch, useCreate } from 'hooks';
import {
  createCategory,
  editCategory,
  fetchCategoryList,
  removeCategory,
} from 'redux/actions/category';
import { setModal } from 'redux/actions/modal';
import { userSelector } from 'redux/reducers/user.';
import { setBreadcrumb } from 'redux/actions/breadcrumb';
import { ModalList } from 'constants/modal';
import { IFormCategoryInputs } from 'types/form';
import useEdit from 'hooks/useEdit';
import useDelete from 'hooks/useDelete';
import { PageWithTable } from 'components/Common';
import CategoriesTable from 'components/Categories/CategoriesTable';
import { CategoriesDataType, CategoryType } from './CategoriesType';

const Categories = () => {
  const user = useAppSelector(userSelector);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<CategoriesDataType>({
    totalItems: 0,
    items: [],
  });
  const dispatch = useTypedDispatch();
  const handleUserNotLoggedIn = useAuthWarning();
  const submitCreateHandle = useCreate(data, setData, createCategory);
  const submitEditHandle = useEdit(data, setData, editCategory);
  const submitDeleteHandle = useDelete(data, setData, setIsLoading, removeCategory, fetchCategoryList);
  const closeModalHandle = useCloseModal();

  useEffect(() => {
    const newBreadcrumb = [
      {
        title: 'Manage Categories',
        href: '/categories',
      },
    ];

    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch]);

  const createCategoryOnClick = () => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn('create category', 'create');
      return;
    }

    dispatch(
      setModal({
        component: ModalList.CREATE_CATEGORY,
        componentProps: { submitHandle: submitCreateHandle, closeHandle: closeModalHandle },
        isLoading: false,
        isOpen: true,
        title: 'Create category form',
        footerContent: undefined,
        closeHandle: closeModalHandle,
      }),
    );
  };

  const editIconOnClick = (id: number) => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn('edit category', 'edit', id);
      return;
    }

    const toBeEditItem = data.items.find((item) => item.id === id);
    if (toBeEditItem) {
      dispatch(
        setModal({
          component: ModalList.EDIT_CATEGORY,
          componentProps: {
            submitHandle: (formData: IFormCategoryInputs) => submitEditHandle(id, formData),
            closeHandle: closeModalHandle,
            footerContent: undefined,
            initValue: toBeEditItem,
          },
          isLoading: false,
          isOpen: true,
          title: 'Edit category form',
          closeHandle: closeModalHandle,

        }),
      );
    }
  };

  const removeIconOnClick = (id: number) => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn('delete category', 'delete', id);
      return;
    }

    const toBeDeleteCategory = data.items.find((category) => category.id === id);

    if (toBeDeleteCategory) {
      dispatch(
        setModal({
          component: ModalList.DELETE_WARNING,
          componentProps: { itemName: toBeDeleteCategory.name },
          isLoading: false,
          isOpen: true,
          title: 'Delete Warning',
          closeHandle: closeModalHandle,
          footerContent: {
            closeButtonContent: 'Cancel',
            submitButtonContent: 'Confirm',
            closeButtonHandle: () => closeModalHandle(),
            submitButtonHandle: () => {
              submitDeleteHandle(id);
            },
          },

        }),
      );
    }
  };

  const renderTable = (list: Array<CategoryType>) => (
    <CategoriesTable list={list} removeHandle={removeIconOnClick} editHandle={editIconOnClick} />
  );

  return (
    <div>
      <PageWithTable
        data={data}
        setData={setData}
        renderTable={renderTable}
        fetchData={fetchCategoryList}
        CreateButton={<Button onClick={createCategoryOnClick}>Create category</Button>}
        tableTitle="Category List"
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        createButtonClick={createCategoryOnClick}
        editIconClick={editIconOnClick}
        removeIconClick={removeIconOnClick}
      />
    </div>
  );
};

export default Categories;
