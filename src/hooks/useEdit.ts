import { useTypedDispatch } from 'hooks';
import isEqual from 'lodash/isEqual';
import { TypedDispatch } from 'redux/store';
import { GenericDataTable } from 'types/common';
import { offLoading, onLoading } from '../redux/actions/modal.action';
import useCloseModal from './useCloseModal';

const useEdit = (
  data: GenericDataTable,
  setData: (param: ((prev:GenericDataTable)=>GenericDataTable) | GenericDataTable) => void,
  dispatchAction: (...params: any) => (dispatch: TypedDispatch) => Promise<GenericDataTable>,
) => {
  const closeModalHandle = useCloseModal();
  const dispatch = useTypedDispatch();

  const handleSubmit = (id: number, formData: {[key:string]:string}) => {
    const editItem = data.items.find((item) => item.id === id);

    if (!editItem) {
      return;
    }

    const currentData = { ...editItem };

    Object.keys(currentData).forEach((key) => {
      if (!Object.hasOwnProperty.call(formData, key)) {
        delete currentData[key];
      }
    });

    if (isEqual(currentData, formData)) {
      closeModalHandle();
      return;
    }

    dispatch(onLoading());
    dispatch(dispatchAction(id, formData))
      .then((resData) => {
        setData((prev) => {
          const index = prev.items.findIndex((item) => item.id === id);
          if (index > -1) {
            const newArray = [...prev.items];
            newArray[index] = { ...newArray[index], ...resData };
            return { ...prev, items: newArray };
          }
          return prev;
        });
        dispatch(offLoading());
        closeModalHandle();
      })
      .catch(() => dispatch(offLoading()));
  };

  return handleSubmit;
};

export default useEdit;
