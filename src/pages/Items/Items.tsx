import { Button } from '@ahaui/react';
import { PageWithTable } from 'components/Common';
import ItemsTable from 'components/Items/ItemsTable';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemList } from 'redux/actions/item.action';

import { ItemsDataType, ItemType } from './ItemsType';

const Items = () => {
  const [data, setData] = useState<ItemsDataType>({
    totalItems: 0,
    items: [],
  });

  const { categoryId } = useParams();

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
      <PageWithTable
        data={data}
        setData={setData}
        renderTable={renderTable}
        breadcrumb={`Manage Category > Id ${categoryId} > Item`}
        tableTitle="Item list"
        fetchData={fetchData}
        CreateButton={<Button onClick={() => null}>Create item</Button>}

      />
    </div>
  );
};

export default Items;
