import { Button } from '@ahaui/react';
import { PageWithTable } from 'components/Common';
import ItemsTable from 'components/Items/ItemsTable';
import { useTypedDispatch } from 'hooks';
import { CategoryType } from 'pages/Categories/CategoriesType';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCategoryDetail } from 'redux/actions/category.action';
import { fetchItemList } from 'redux/actions/item.action';

import { ItemsDataType, ItemType } from './ItemsType';

const Items = () => {
  const [data, setData] = useState<ItemsDataType>({
    totalItems: 0,
    items: [],
  });

  const [category, setCategory] = useState<CategoryType>();

  const dispatch = useTypedDispatch();
  const { categoryId } = useParams();

  useEffect(() => {
    if (!categoryId) return;

    const categoryIdNum = +categoryId;
    dispatch(fetchCategoryDetail(categoryIdNum)).then((resData) => setCategory(resData));
  }, [categoryId, dispatch]);

  const fetchData = useCallback((pageNumber:number) => fetchItemList(categoryId, pageNumber), [categoryId]);

  // const fetchData = (pageNumber:number) => fetchItemList(categoryId, pageNumber);

  const renderTable = (list:Array<ItemType>) => {
    if (categoryId) {
      return <ItemsTable categoryId={categoryId} list={list} removeHandle={() => null} editHandle={() => null} />;
    }
    return null;
  };

  return (
    <div>
      {category && (
      <PageWithTable
        data={data}
        setData={setData}
        renderTable={renderTable}
        breadcrumb={`Manage Category > ${category.name} > Item`}
        tableTitle="Item list"
        fetchData={fetchData}
        CreateButton={<Button onClick={() => null}>Create item</Button>}
      />
      )}
    </div>
  );
};

export default Items;
