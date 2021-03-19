import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AlertMsg = () => {
  return (
    <ToastContainer
      pauseOnHover
      newestOnTop={false}
      position="bottom-center"
      hideProgressBar={false}
      autoClose={1500}
    />
  );
};

export default AlertMsg;
