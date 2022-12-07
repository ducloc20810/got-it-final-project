import { AUTH_STORAGE_KEY } from 'constants/storage';
import { Middleware } from 'redux';
import { TypedDispatch } from 'redux/store';
import { clearMessage, setMessage } from 'redux/actions/message';
import { camelCaseObjKeys, upperFirstChar } from 'utils/library';
import { MessageActions } from './message';
import { UserActions } from './user';

// redux middleware
export const authMiddleware: Middleware = () => (next) => (action) => {
  const { type, payload } = action;

  if (type === `${UserActions.LOGIN}_SUCCESS`) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
  }

  return next(action);
};

export const messageMiddleware: Middleware = () => (next) => (action) => {
  const { type, payload } = action;

  if (type === MessageActions.SET_MESSAGE) {
    if (payload?.message) {
      if (
        payload.message.includes(UserActions.LOGIN)
        || payload.message.includes(UserActions.REGISTER)
        || payload.message.includes('FETCH')
      ) {
        return next(clearMessage());
      }

      const newTypeMessage = upperFirstChar(payload.message);

      action.payload.message = newTypeMessage;
    }
  }

  return next(action);
};

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
      dispatch(
        setMessage({
          message: `${type} successfully`,
          status: res.status,
        }),
      );

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
