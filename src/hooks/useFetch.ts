import { useTypedDispatch } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { TypedDispatch } from 'redux/store';

const useFetch = (dispatchAction: (...params:any[]) => (dispatch: TypedDispatch) => Promise<any>) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useTypedDispatch();
  const isCancel = useRef(false);

  useEffect(() => {
    isCancel.current = false;
    setIsLoading(true);
    dispatch(dispatchAction()).then((resData) => {
      if (!isCancel.current) {
        setData(resData);
        setIsLoading(false);
      }
    }).catch(() => {
      if (!isCancel.current) {
        setIsLoading(false);
      }
    });

    return () => {
      setIsLoading(false);
      isCancel.current = true;
    };
  }, [dispatchAction, dispatch]);

  return { isLoading, data };
};

export default useFetch;
