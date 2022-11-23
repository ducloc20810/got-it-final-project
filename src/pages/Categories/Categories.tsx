import { Button } from '@ahaui/react';
import CategoriesTable from 'components/Categories/CategoriesTable';
import { PageWithTable } from 'components/Common';
import { useTypedDispatch } from 'hooks';
import {
  createCategory,
  fetchCategoryList,
} from 'redux/actions/category.action';
import {
  clearModal,
  setLoading,
  setModal,
} from 'redux/actions/modal.action';
import { CategoriesDataType, CategoryType } from './CategoriesType';
import { IFormCategoryInputs } from 'types/form';
import CategoryCreateForm from 'components/Categories/CategoryCreateForm';
import { useState } from 'react';

const Categories = () => {
  const [data, setData] = useState<CategoriesDataType>({
    total_items: 0,
    items: [],
  });
  const dispatch = useTypedDispatch();

  const renderTable = (list: Array<CategoryType>) => (
    <CategoriesTable
      list={list}
      removeHandle={() => {}}
      editHandle={() => {}}
    />
  );

  const submitCreateFormModalHandle = (data: IFormCategoryInputs) => {
    if (data.name && data.description && data.imageUrl) {
      dispatch(setLoading());

      dispatch(
        createCategory({
          name: data.name,
          description: data.description,
          image_url: data.imageUrl,
        }),
      ).then((data) => {
        setData((prev) => ({
          ...prev,
          total_items: prev.total_items + 1,
          items: [...prev.items, data],
        }));
        dispatch(clearModal());
      });
    }
  };

  const closeModalHandle = () => {
    dispatch(clearModal());
  };

  const createCategoryOnClick = () => {
    dispatch(
      setModal({
        children: (
          <CategoryCreateForm
            submitHandle={submitCreateFormModalHandle}
            closeHandle={closeModalHandle}
          />
        ),
        isLoading: false,
        isOpen: true,
        title: 'Create category form',
        footer: null,
        closeHandle: closeModalHandle,
      }),
    );
  };

  return (
    <div>
      <PageWithTable
        data={data}
        setData={setData}
        renderTable={renderTable}
        breadcrumb={'Manage Category'}
        fetchData={fetchCategoryList}
        CreateButton={
          <Button onClick={createCategoryOnClick}>
            Create category
          </Button>
        }
        tableTitle={'Category List'}
      />
    </div>
  );
};

export default Categories;
