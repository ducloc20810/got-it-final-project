import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector, useThunkDispatch } from "hooks";
import { messageSelector } from "redux/reducers/message.reducer";
import { clearMessage } from "redux/actions/message.action";

const Message = () => {
  const message = useAppSelector(messageSelector);
  const dispatch = useThunkDispatch();
  useEffect(() => {
    if (!message.status && !message.error && !message.message) return;

    // If API return error
    if (message.status && message.error) {
      if (!message.error.hasOwnProperty("data")) {
        toast.error(`${message.status}: ${message.error.message}`);
      } else {
        for (let keys in message.error.data) {
          toast.error(`${message.status}: ${message.error.data[keys][0]}`);
        }
      }
    }

    // If fetch error
    else if (!message.status && message.error) {
      toast.error(message.error.message);
    } else if (message.message) toast(message.message);

    return () => {
      dispatch(clearMessage());
    };
  }, [message]);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Message;
