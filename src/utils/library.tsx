import lodash from 'lodash';
import { categoryActions } from 'redux/actions/category.action';
import { setMessage } from 'redux/actions/message.action';
import { userActions } from 'redux/actions/user.action';
import { TypedDispatch } from 'redux/store';

export const upperFirstChar = (yourString: string) => {
  let newString = yourString.split('_').join(' ');
  newString = newString.toLowerCase().charAt(0).toUpperCase() + newString.toLowerCase().slice(1);

  return newString;
};

// eslint-disable-next-line max-len
export const generateNumberArray = (length: number) =>
  Array.from({ length: length }, (_, i) => i + 1);

export const camelize = (data: any) => {
  if (lodash.isArray(data)) {
    const newDataArr: any[] = data.map((item) => camelize(item));
    return newDataArr;
  }

  if (lodash.isObject(data)) {
    const dataCopy: Record<string, unknown> = { ...data };
    const newData: Record<string, unknown> = {};
    Object.keys(data).forEach((key: string) => {
      const newKey = lodash.camelCase(key);
      newData[newKey] = camelize(dataCopy[key]);
    });
    return newData;
  }

  return data;
};

export const snakeLize = (data:any) => {
  if (lodash.isArray(data)) {
    const newDataArr: any[] = data.map((item) => camelize(item));
    return newDataArr;
  }

  if (lodash.isObject(data)) {
    const dataCopy: Record<string, unknown> = { ...data };
    const newData: Record<string, unknown> = {};
    Object.keys(data).forEach((key: string) => {
      const newKey = lodash.snakeCase(key);
      newData[newKey] = camelize(dataCopy[key]);
    });
    return newData;
  }

  return data;
};

export const handleAsyncAction = async (
  dispatch: TypedDispatch,
  type: string,
  promise: () => Promise<Response>,
) => {
  try {
    const res = await promise();
    let data = await res.json();

    data = camelize(data);
    if (res.ok) {
      const newType = upperFirstChar(type);
      if (type === 'LOGIN') {
        localStorage.setItem('auth', JSON.stringify(data));
      }

      if (
        type !== userActions.LOGIN
        && type !== userActions.REGISTER
        && type !== userActions.FETCH_USER_INFO
        && type !== categoryActions.FETCH_CATEGORY_LIST
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
