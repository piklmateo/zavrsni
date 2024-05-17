import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastComponentProps {
  message: string;
}

function ToastComponent({ message }: ToastComponentProps) {
  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default ToastComponent;
