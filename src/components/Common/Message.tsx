import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "hooks";
import { messageSelector } from "redux/reducers/message.reducer";

const Message = () => {
  const message = useAppSelector(messageSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (message && message.status && message.data) {
      toast(`${message.status}: ${message.message}`);
    }

    return () => {
      dispatch({ type: "CLEAR_MESSAGE" });
    };
  }, [message, dispatch]);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Message;
