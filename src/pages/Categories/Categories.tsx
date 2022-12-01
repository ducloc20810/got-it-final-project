import { useState } from 'react';
import { Button } from '@ahaui/react';
import { PageWithTable } from 'components/Common';
import CategoriesTable from 'components/Categories/CategoriesTable';
import { ModalList } from 'constants/modal';
import { useAuthWarning, useCloseModal, useAppSelector, useTypedDispatch, useCreate } from 'hooks';
import {
  createCategory,
  editCategory,
  fetchCategoryList,
  removeCategory,
} from 'redux/actions/category.action';
import { setModal } from 'redux/actions/modal.action';
import { userSelector } from 'redux/reducers/user.reducer';
import { IFormCategoryInputs } from 'types/form';
import useEdit from 'hooks/useEdit';
import useDelete from 'hooks/useDelete';
import { CategoriesDataType, CategoryType } from './CategoriesType';

const Categories = () => {
  const closeModalHandle = useCloseModal();
  const user = useAppSelector(userSelector);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleUserNotLoggedIn = useAuthWarning('create category');
  const [data, setData] = useState<CategoriesDataType>({
    totalItems: 0,
    items: [],
  });
  const dispatch = useTypedDispatch();
  const submitCreateHandle = useCreate(data, setData, createCategory);
  const submitEditHandle = useEdit(data, setData, editCategory);
  const deleteSubmitHandle = useDelete(data, setData, setIsLoading, removeCategory, fetchCategoryList);

  const createCategoryOnClick = () => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn();
      return;
    }

    dispatch(
      setModal({
        component: ModalList.CREATE_CATEGORY,
        componentProps: { submitHandle: submitCreateHandle, closeHandle: closeModalHandle },
        isLoading: false,
        isOpen: true,
        title: 'Create category form',
        closeHandle: closeModalHandle,
      }),
    );
  };

  const editIconOnClick = (id: number) => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn();
      return;
    }
    const index = data.items.findIndex((item) => item.id === id);
    dispatch(
      setModal({
        component: ModalList.EDIT_CATEGORY,
        componentProps: {
          submitHandle: (formData: IFormCategoryInputs) => submitEditHandle(id, formData),
          closeHandle: closeModalHandle,
          initValue: data.items[index],
        },
        isLoading: false,
        isOpen: true,
        title: 'Edit category form',
        closeHandle: closeModalHandle,

      }),
    );
  };

  const removeIconOnClick = (id: number) => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn();
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
              deleteSubmitHandle(id);
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
        breadcrumb="Manage Category"
        fetchData={fetchCategoryList}
        CreateButton={<Button onClick={createCategoryOnClick}>Create category</Button>}
        tableTitle="Category List"
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Categories;
