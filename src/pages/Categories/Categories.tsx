import { useState } from 'react';
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
import { IFormCategoryInputs } from 'types/form';
import CategoryCreateForm from 'components/Categories/CategoryCreateForm';
import { CategoriesDataType, CategoryType } from './CategoriesType';

const Categories = () => {
  const [data, setData] = useState<CategoriesDataType>({
    totalItems: 0,
    items: [],
  });
  const dispatch = useTypedDispatch();

  const renderTable = (list: Array<CategoryType>) => (
    <CategoriesTable
      list={list}
      removeHandle={() => {
        console.log('developing');
      }}
      editHandle={() => {
        console.log('developing');
      }}
    />
  );

  const submitCreateFormModalHandle = (
    formData: IFormCategoryInputs,
  ) => {
    if (formData.name && formData.description && formData.imageUrl) {
      dispatch(setLoading());

      dispatch(
        createCategory({
          name: formData.name,
          description: formData.description,
          imageUrl: formData.imageUrl,
        }),
      ).then((resData) => {
        setData((prev) => ({
          ...prev,
          total_items: prev.totalItems + 1,
          items: [...prev.items, resData],
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
        breadcrumb="Manage Category"
        fetchData={fetchCategoryList}
        CreateButton={(
          <Button onClick={createCategoryOnClick}>
            Create category
          </Button>
        )}
        tableTitle="Category List"
      />
    </div>
  );
};

export default Categories;
