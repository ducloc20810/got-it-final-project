import { useState } from 'react';
import { Button, Modal } from '@ahaui/react';
import lodash from 'lodash';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CategoriesTable from 'components/Categories/CategoriesTable';
import { AuthWarning, DeleteWarning, PageWithTable } from 'components/Common';
import CategoryCreateForm from 'components/Categories/CategoryCreateForm';
import { IFormCategoryInputs } from 'types/form';
import { useAppSelector, useTypedDispatch } from 'hooks';
import {
  createCategory,
  editCategory,
  fetchCategoryList,
  removeCategory,
} from 'redux/actions/category.action';
import { clearModal, closeModal, offLoading, onLoading, setModal } from 'redux/actions/modal.action';
import { userSelector } from 'redux/reducers/user.reducer';
import { ITEMS_PER_PAGE } from 'constants/pagination';
import { CategoriesDataType, CategoryType } from './CategoriesType';

const Categories = () => {
  const user = useAppSelector(userSelector);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      dispatch(onLoading());

      dispatch(
        createCategory({
          name: formData.name,
          description: formData.description,
          imageUrl: formData.imageUrl,
        }),
      ).then((resData) => {
        const remainItemNumber = data.totalItems % ITEMS_PER_PAGE;
        const totalPage = Math.floor(data.totalItems / ITEMS_PER_PAGE);
        const lastPage = remainItemNumber ? totalPage + 1 : totalPage;

        const page = searchParams.get('page');
        const pageNumber = page && +page ? +page : 1;

        if (remainItemNumber && pageNumber === lastPage) {
          setData((prev) => ({
            totalItems: prev.totalItems + 1,
            items: [...prev.items, resData],
          }));
        }
        else if (remainItemNumber && pageNumber !== lastPage) {
          searchParams.set('page', lastPage.toString());
          setSearchParams(searchParams);
        }
        else if (!remainItemNumber && lastPage === 0) {
          setData((prev) => ({
            totalItems: prev.totalItems + 1,
            items: [...prev.items, resData],
          }));
        }
        else {
          searchParams.set('page', (lastPage + 1).toString());
          setSearchParams(searchParams);
        }
        dispatch(offLoading());
        closeModalHandle();
      }).catch(() => dispatch(offLoading()));
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
        closeHandle: closeModalHandle,
        footer: null,
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
        closeHandle: closeModalHandle,
        footer: null,
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
          children: <DeleteWarning itemName={toBeDeleteCategory.name} />,
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
