import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "hooks";
import { messageSelector } from "redux/reducers/message.reducer";

const Message = () => {
  const message = useAppSelector(messageSelector);
  useEffect(() => {
    // If API return error
    if (message.status && message.error) {
      if (!message.error.hasOwnProperty("data")) {
        toast.error(`${message.status}: ${message.error.message}`);
      } else {
        for (let keys in message.error.data) {
          toast.error(`${message.status}: ${message.error.data[keys][0]}`);
        }
      }
      return;
    }

    // If fetch error
    if (!message.status && message.error) {
      toast.error(message.error.message);
      return;
    }

    if (message.message) toast(message.message);
  }, [message]);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Message;
