import { useSearchParams } from 'react-router-dom';
import { useTypedDispatch } from 'hooks';
import { TypedDispatch } from 'redux/store';
import { GenericDataTable } from 'types/common';
import { offLoading, onLoading } from '../redux/actions/modal.action';
import useCloseModal from './useCloseModal';

const useDelete = (
  data: GenericDataTable,
  setData: (param: ((prev:GenericDataTable)=>GenericDataTable) | GenericDataTable) => void,
  setIsLoading: (param:((prev:boolean)=>boolean) | boolean) => void,
  dispatchDeleteAction: (...params: any[]) => (dispatch: TypedDispatch) => Promise<GenericDataTable>,
  dispatchFetchAction: (...params: any[]) => (dispatch: TypedDispatch) => Promise<GenericDataTable>,
) => {
  const closeModalHandle = useCloseModal();
  const dispatch = useTypedDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (id: number) => {
    try {
      dispatch(onLoading());
      await dispatch(dispatchDeleteAction(id));
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
          const resData = await dispatch(dispatchFetchAction(pageNumber));
          setData(resData);
          setIsLoading(false);
        }
      }
      else {
        setIsLoading(true);
        const resData = await dispatch(dispatchFetchAction(1));
        setData(resData);
        setIsLoading(false);
      }
      dispatch(offLoading());
    }
    catch {
      dispatch(offLoading());
    }
  };

  return handleSubmit;
};

export default useDelete;
