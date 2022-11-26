import { useState } from 'react';
import { Button, Modal } from '@ahaui/react';
import { useNavigate } from 'react-router-dom';
import CategoriesTable from 'components/Categories/CategoriesTable';
import { AuthWarning, PageWithTable } from 'components/Common';
import { useAppSelector, useTypedDispatch } from 'hooks';
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
import { userSelector } from 'redux/reducers/user.reducer';
import { CategoriesDataType, CategoryType } from './CategoriesType';

const Categories = () => {
  const user = useAppSelector(userSelector);
  const navigate = useNavigate();

  const [data, setData] = useState<CategoriesDataType>({
    totalItems: 0,
    items: [],
  });
  const dispatch = useTypedDispatch();

  const renderTable = (list: Array<CategoryType>) => (
    <CategoriesTable
      list={list}
      removeHandle={() => null}
      editHandle={() => null}
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
        if (data.totalItems < 20) {
          setData((prev) => ({
            ...prev,
            total_items: prev.totalItems + 1,
            items: [...prev.items, resData],
          }));
        }
        dispatch(clearModal());
      }).catch(() => null);
    }
  };

  const closeModalHandle = () => {
    dispatch(clearModal());
  };

  const createCategoryOnClick = () => {
    if (!user.isLoggedIn) {
      dispatch(setModal({
        children: <AuthWarning action="create category" />,
        isLoading: false,
        isOpen: true,
        title: 'Warning authentication',
        footer:
        (
          <Modal.Footer>
            <Button variant="secondary" width="full" onClick={() => closeModalHandle()}>Cancel</Button>
            <Button
              variant="primary"
              width="full"
              onClick={() => {
                navigate('/login');
                dispatch(clearModal());
              }}
            >
              Okay
            </Button>
          </Modal.Footer>
        ),
        closeHandle: closeModalHandle,
      }));
      return;
    }

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
