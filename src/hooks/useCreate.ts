import { GenericDataTable } from 'types/common';
import { ITEMS_PER_PAGE } from 'constants/pagination';
import { useTypedDispatch, useCloseModal } from 'hooks';
import { useSearchParams } from 'react-router-dom';
import { offLoading, onLoading } from 'redux/actions/modal.action';
import { TypedDispatch } from 'redux/store';

const useCreate = (
  data: GenericDataTable,
  setData: (param: (prev:GenericDataTable)=>GenericDataTable | GenericDataTable) => void,
  dispatchCreateFunction: (...params: any) => (dispatch: TypedDispatch) => Promise<GenericDataTable>,
) => {
  const dispatch = useTypedDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const closeModalHandle = useCloseModal();

  const handleSubmit = (formData: any) => {
    dispatch(onLoading());

    dispatch(dispatchCreateFunction(formData))
      .then((resData: GenericDataTable) => {
        const remainItemNumber = data.totalItems % ITEMS_PER_PAGE;
        const totalPage = Math.floor(data.totalItems / ITEMS_PER_PAGE);
        const lastPage = remainItemNumber ? totalPage + 1 : totalPage;

        const page = searchParams.get('page');
        const pageNumber = page && +page ? +page : 1;

        if (remainItemNumber && pageNumber === lastPage) {
          setData((prev: GenericDataTable) => ({
            totalItems: prev.totalItems + 1,
            items: [...prev.items, resData],
          }));
        }
        else if (remainItemNumber && pageNumber !== lastPage) {
          searchParams.set('page', lastPage.toString());
          setSearchParams(searchParams);
        }
        else if (!remainItemNumber && lastPage === 0) {
          setData((prev: GenericDataTable) => ({
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
      })
      .catch(() => dispatch(offLoading()));
  };
  return handleSubmit;
};

export default useCreate;
