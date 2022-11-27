import { useState } from 'react';
import { Button, Modal } from '@ahaui/react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CategoriesTable from 'components/Categories/CategoriesTable';
import { AuthWarning, DeleteWarning, PageWithTable } from 'components/Common';
import CategoryCreateForm from 'components/Categories/CategoryCreateForm';
import { IFormCategoryInputs } from 'types/form';
import { useAppSelector, useTypedDispatch } from 'hooks';
import { createCategory, editCategory, fetchCategoryList, removeCategory } from 'redux/actions/category.action';
import { clearModal, closeModal, setLoading, setModal } from 'redux/actions/modal.action';
import { userSelector } from 'redux/reducers/user.reducer';
import { CategoriesDataType, CategoryType } from './CategoriesType';

const Categories = () => {
  const user = useAppSelector(userSelector);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [data, setData] = useState<CategoriesDataType>({
    totalItems: 0,
    items: [],
  });
  const dispatch = useTypedDispatch();

  const closeModalHandle = () => {
    dispatch(closeModal());
    setTimeout(() => dispatch(clearModal()), 600);
  };

  const handleUserNotLoggedIn = () => {
    dispatch(
      setModal({
        children: <AuthWarning action="create category" />,
        isLoading: false,
        isOpen: true,
        title: 'Authentication Warning',
        footer: (
          <Modal.Footer>
            <Button variant="secondary" width="full" onClick={() => closeModalHandle()}>
              Cancel
            </Button>
            <Button
              variant="primary"
              width="full"
              onClick={() => {
                navigate('/login', { state: { prevPath: location.pathname } });
                dispatch(clearModal());
              }}
            >
              Okay
            </Button>
          </Modal.Footer>
        ),
        closeHandle: closeModalHandle,
      }),
    );
  };

  const submitCreateFormModalHandle = (formData: IFormCategoryInputs) => {
    if (formData.name && formData.description && formData.imageUrl) {
      dispatch(setLoading());

      dispatch(
        createCategory({
          name: formData.name,
          description: formData.description,
          imageUrl: formData.imageUrl,
        }),
      )
        .then((resData) => {
          if (data.items.length === 20) {
            const page = searchParams.get('page');
            if (page) {
              searchParams.set('page', (+page + 1).toString());
              setSearchParams(searchParams);
            }
          }
          else {
            setData((prev) => ({
              totalItems: prev.totalItems + 1,
              items: [...prev.items, resData],
            }));
          }
          closeModalHandle();
        })
        .catch(() => null);
    }
  };

  const createCategoryOnClick = () => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn();
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

  const submitEditHandle = (id: number, formData: IFormCategoryInputs) => {
    dispatch(editCategory(id, formData)).then((category) => {
      setData((prev) => {
        const index = prev.items.findIndex((item) => item.id === id);
        if (index > -1) {
          const newArray = [...prev.items];
          newArray[index] = { id: id, ...category };
          return { ...prev, items: newArray };
        }
        return prev;
      });
      closeModalHandle();
    });
  };

  const editIconOnClick = (id: number) => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn();
      return;
    }
    const index = data.items.findIndex((item) => item.id === id);
    dispatch(
      setModal({
        children: (
          <CategoryCreateForm
            submitHandle={(formData: IFormCategoryInputs) => submitEditHandle(id, formData)}
            closeHandle={closeModalHandle}
            initValue={data.items[index]}
          />
        ),
        isLoading: false,
        isOpen: true,
        title: 'Edit category form',
        footer: null,
        closeHandle: closeModalHandle,
      }),
    );
  };

  const deleteSubmitHandle = (id:number) => {
    dispatch(removeCategory(id)).then(() => {
      const page = searchParams.get('page');
      if (page) {
        if (data.items.length === 1) {
          searchParams.set('page', (+page - 1).toString());
          setSearchParams(searchParams);
        }
        else {
          dispatch(fetchCategoryList(+page)).then((resData) => setData(resData));
        }
      }
    });
  };

  const removeIconOnClick = (id:number) => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn();
      return;
    }

    const toBeDeleteCategory = data.items.find((category) => category.id === id);

    if (toBeDeleteCategory) {
      dispatch(setModal({
        children: <DeleteWarning itemName={toBeDeleteCategory.name} />,
        isLoading: false,
        isOpen: true,
        title: 'Delete Warning',
        closeHandle: closeModalHandle,
        footer: (
          <Modal.Footer>
            <Button variant="secondary" width="full" onClick={() => closeModalHandle()}>
              Cancel
            </Button>
            <Button
              variant="primary"
              width="full"
              onClick={() => {
                deleteSubmitHandle(id);
                dispatch(clearModal());
              }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        ),

      }));
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
      />
    </div>
  );
};

export default Categories;
