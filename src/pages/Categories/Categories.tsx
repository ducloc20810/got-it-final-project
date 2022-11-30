import { useState } from 'react';
import { Button } from '@ahaui/react';
import { useSearchParams } from 'react-router-dom';
import lodash from 'lodash';
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
import { offLoading, onLoading, setModal } from 'redux/actions/modal.action';
import { userSelector } from 'redux/reducers/user.reducer';
import { IFormCategoryInputs } from 'types/form';
import { CategoriesDataType, CategoryType } from './CategoriesType';

const Categories = () => {
  const closeModalHandle = useCloseModal();
  const user = useAppSelector(userSelector);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleUserNotLoggedIn = useAuthWarning('create category');
  const [data, setData] = useState<CategoriesDataType>({
    totalItems: 0,
    items: [],
  });
  const dispatch = useTypedDispatch();
  const submitCreateFormModalHandle = useCreate(data, setData, createCategory);

  const createCategoryOnClick = () => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn();
      return;
    }

    dispatch(
      setModal({
        component: ModalList.CREATE_CATEGORY,
        componentProps: { submitHandle: submitCreateFormModalHandle, closeHandle: closeModalHandle },
        isLoading: false,
        isOpen: true,
        title: 'Create category form',
        closeHandle: closeModalHandle,
      }),
    );
  };

  const submitEditHandle = (id: number, formData: IFormCategoryInputs) => {
    const currentCategory = data.items.find((category) => category.id === id);

    if (!currentCategory) return;

    const currentCategoryData = {
      name: currentCategory.name,
      imageUrl: currentCategory.imageUrl,
      description: currentCategory.description,
    };
    if (lodash.isEqual(currentCategoryData, formData)) {
      closeModalHandle();
      return;
    }

    dispatch(onLoading());
    dispatch(editCategory(id, formData))
      .then((category) => {
        setData((prev) => {
          const index = prev.items.findIndex((item) => item.id === id);
          if (index > -1) {
            const newArray = [...prev.items];
            newArray[index] = { id: id, ...category };
            return { ...prev, items: newArray };
          }
          return prev;
        });
        dispatch(offLoading());
        closeModalHandle();
      })
      .catch(() => dispatch(offLoading()));
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

  const deleteSubmitHandle = async (id: number) => {
    try {
      dispatch(onLoading());
      await dispatch(removeCategory(id));
      closeModalHandle();

      const page = searchParams.get('page');
      if (page) {
        const pageNumber = +page;
        if (data.items.length === 1 && pageNumber !== 1) {
          searchParams.set('page', (pageNumber - 1).toString());
          setSearchParams(searchParams);
        }
        else {
          setIsLoading(true);
          const resData = await dispatch(fetchCategoryList(pageNumber));
          setData(resData);
          setIsLoading(false);
        }
      }
      else {
        setIsLoading(true);
        const resData = await dispatch(fetchCategoryList(1));
        setData(resData);
      }
      dispatch(offLoading());
    }
    catch {
      dispatch(offLoading());
    }
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
