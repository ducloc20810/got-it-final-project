import { setMessage } from 'redux/actions/message';
import { UserActions } from 'redux/actions/user';
import { TypedDispatch } from 'redux/store';
import { AUTH_STORAGE_KEY } from 'constants/storage';
import { camelCaseObjKeys, upperFirstChar } from 'utils/library';

export const handleAsyncAction = async (
  dispatch: TypedDispatch,
  type: string,
  promise: () => Promise<Response>,
) => {
  try {
    const res = await promise();
    let data = await res.json();

    data = camelCaseObjKeys(data);
    if (res.ok) {
      const newType = upperFirstChar(type);
      if (type === UserActions.LOGIN) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
      }

      if (
        type !== UserActions.LOGIN
        && type !== UserActions.REGISTER
        && !type.includes('FETCH')
      ) {
        dispatch(
          setMessage({
            message: `${newType} successfully`,
            status: res.status,
          }),
        );
      }

      dispatch({ type: `${type}_SUCCESS`, payload: data });
      return Promise.resolve(data);
    }

    // If res is not ok
    dispatch(
      setMessage({
        status: res.status,
        error: data,
      }),
    );
    return Promise.reject(data.message);
  }
  catch (err) {
    dispatch(
      setMessage({
        error: { message: 'Something is wrong' },
      }),
    );
    return Promise.reject(err);
  }
};
