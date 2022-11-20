import { categoryActions } from "redux/actions/category.action";
import { setMessage } from "redux/actions/message.action";
import { userActions } from "redux/actions/user.action";
import { TypedDispatch } from "redux/store";

export const handleAsyncAction = async (
  dispatch: TypedDispatch,
  type: string,
  promise: Function
) => {
  try {
    const res = await promise();
    const data = await res.json();

    if (res.ok) {
      const newType = upperFirstChar(type);
      if (type === "LOGIN") {
        localStorage.setItem("auth", JSON.stringify(data));
      }

      if (
        type !== userActions.LOGIN &&
        type !== userActions.REGISTER &&
        type !== userActions.GET_USER_INFO &&
        type !== categoryActions.FETCH_CATEGORY_LIST
      )
        dispatch(
          setMessage({
            message: `${newType} successfully`,
            status: res.status,
          })
        );

      dispatch({ type: `${type}_SUCCESS` });
      return Promise.resolve(data);
    }

    // If res is not ok
    dispatch(
      setMessage({
        status: res.status,
        error: data,
      })
    );
    return Promise.reject(data.message);
  } catch (err) {
    console.log(err);
    dispatch(
      setMessage({
        error: { message: "Something is wrong" },
      })
    );
    return Promise.reject(err);
  }
};

export const generateNumberArray = (length: number) =>
  Array.from({ length: length }, (_, i) => i + 1);

export const upperFirstChar = (yourString: string) => {
  let newString = yourString.split("_").join(" ");
  newString =
    newString.toLowerCase().charAt(0).toUpperCase() +
    newString.toLowerCase().slice(1);

  return newString;
};
