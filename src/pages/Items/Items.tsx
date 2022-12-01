import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Skeleton } from '@ahaui/react';
import ItemsTable from 'components/Items/ItemsTable';
import { PageWithTable } from 'components/Common';
import { CategoryType } from 'pages/Categories/CategoriesType';
import { ModalList } from 'constants/modal';
import { useAppSelector, useAuthWarning, useCloseModal, useCreate, useFetch, useTypedDispatch } from 'hooks';
import { fetchCategoryDetail } from 'redux/actions/category.action';
import { createItem, editItem, fetchItemList, removeItem } from 'redux/actions/item.action';
import { userSelector } from 'redux/reducers/user.reducer';
import { setModal } from 'redux/actions/modal.action';
import useEdit from 'hooks/useEdit';
import { IFormItemInputs } from 'types/form';
import useDelete from 'hooks/useDelete';
import { ItemsDataType, ItemType } from './ItemsType';

const Items = () => {
  const user = useAppSelector(userSelector);

  const [data, setData] = useState<ItemsDataType>({
    totalItems: 0,
    items: [],
  });

  const { categoryId = -1 } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useTypedDispatch();
  const closeModalHandle = useCloseModal();
  const handleUserNotLoggedIn = useAuthWarning('create item');

  const fetchCategory = useCallback(() => fetchCategoryDetail(+categoryId), [categoryId]);

  const { data: category, isLoading: categoryLoading }:{data:CategoryType, isLoading:boolean} = useFetch(fetchCategory);

  const fetchData = useCallback(
    (pageNumber: number) => fetchItemList(+categoryId, pageNumber),
    [categoryId],
  );

  const submitCreateHandle = useCreate(data, setData, (formData) =>
    createItem(+categoryId, formData));

  const submitEditHandle = useEdit(data, setData, (id, formData) => editItem(+categoryId, id, formData));

  const submitDeleteHandle = useDelete(data, setData, setIsLoading, (id) => removeItem(+categoryId, id), (pageNumber) => fetchItemList(+categoryId, pageNumber));

  const createItemOnClick = () => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn();
      return;
    }

    dispatch(
      setModal({
        component: ModalList.CREATE_ITEM,
        componentProps: {
          submitHandle: submitCreateHandle,
          closeHandle: closeModalHandle,
        },
        isLoading: false,
        isOpen: true,
        title: 'Create item form',
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
        component: ModalList.EDIT_ITEM,
        componentProps: {
          submitHandle: (formData: IFormItemInputs) => submitEditHandle(id, formData),
          closeHandle: closeModalHandle,
          initValue: data.items[index],
        },
        isLoading: false,
        isOpen: true,
        title: 'Edit item form',
        closeHandle: closeModalHandle,

      }),
    );
  };

  const removeIconOnClick = (id: number) => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn();
      return;
    }

    const toBeDeleteItem = data.items.find((item) => item.id === id);

    if (toBeDeleteItem) {
      dispatch(
        setModal({
          component: ModalList.DELETE_WARNING,
          componentProps: { itemName: `item ${toBeDeleteItem.id}` },
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

  const renderTable = (list: Array<ItemType>) => {
    if (categoryId) {
      return (
        <ItemsTable
          categoryId={categoryId}
          list={list}
          removeHandle={removeIconOnClick}
          editHandle={editIconOnClick}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <PageWithTable
        data={data}
        setData={setData}
        renderTable={renderTable}
        breadcrumb={
          !categoryLoading ? (
            `Manage Category > ${category ? category.name : 'undefined'}`
          ) : (
            <Skeleton width="400px" height="30px" />
          )
        }
        tableTitle="Item list"
        fetchData={fetchData}
        CreateButton={<Button onClick={createItemOnClick}>Create item</Button>}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Items;
