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
      let newType = type.split("_").join(" ");
      newType =
        newType.toLowerCase().charAt(0).toUpperCase() +
        newType.toLowerCase().slice(1);

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
