import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Skeleton } from '@ahaui/react';
import { PageWithTable } from 'components/Common';
import ItemsTable from 'components/Items/ItemsTable';
import { useAppSelector, useAuthWarning, useCloseModal, useCreate, useTypedDispatch } from 'hooks';
import { CategoryType } from 'pages/Categories/CategoriesType';
import { fetchCategoryDetail } from 'redux/actions/category.action';
import { createItem, fetchItemList } from 'redux/actions/item.action';
import { userSelector } from 'redux/reducers/user.reducer';
import { setModal } from 'redux/actions/modal.action';
import ItemCreateForm from 'components/Items/ItemCreateForm';
import { ItemsDataType, ItemType } from './ItemsType';

const Items = () => {
  const user = useAppSelector(userSelector);

  const [data, setData] = useState<ItemsDataType>({
    totalItems: 0,
    items: [],
  });

  const [category, setCategory] = useState<CategoryType>({
    name: '',
    id: NaN,
    description: '',
    imageUrl: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useTypedDispatch();
  const { categoryId = -1 } = useParams();
  const closeModalHandle = useCloseModal();
  const handleUserNotLoggedIn = useAuthWarning('create item');

  useEffect(() => {
    if (!categoryId) return;

    const categoryIdNum = +categoryId;
    dispatch(fetchCategoryDetail(categoryIdNum)).then((resData) => setCategory(resData));
  }, [categoryId, dispatch]);

  const fetchData = useCallback((pageNumber:number) => fetchItemList(categoryId, pageNumber), [categoryId]);

  const submitCreateItemHandle = useCreate(data, setData, (formData) => createItem(+categoryId, formData));

  const createItemOnClick = () => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn();
      return;
    }

    dispatch(
      setModal({
        children: (
          <ItemCreateForm
            submitHandle={submitCreateItemHandle}
            closeHandle={closeModalHandle}
          />
        ),
        isLoading: false,
        isOpen: true,
        title: 'Create item form',
        closeHandle: closeModalHandle,
        footer: null,
      }),
    );
  };

  const renderTable = (list:Array<ItemType>) => {
    if (categoryId) {
      return <ItemsTable categoryId={categoryId} list={list} removeHandle={() => null} editHandle={() => null} />;
    }
    return null;
  };

  return (
    <div>
      <PageWithTable
        data={data}
        setData={setData}
        renderTable={renderTable}
        breadcrumb={!isLoading ? `Manage Category > ${category.name} > Item` : <Skeleton width="400px" height="30px" />}
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
