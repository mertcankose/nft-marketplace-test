import { toast } from "react-toastify";
import { autoCloseToastNormally } from "../constants";

export const successNotify = (text) => {
  toast.success(text, {
    position: "bottom-right",
    autoClose: autoCloseToastNormally,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const errorNotify = (text) => {
  toast.error(text, {
    position: "bottom-right",
    autoClose: autoCloseToastNormally,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const warningNotify = (text) => {
  toast.warn(text, {
    position: "bottom-right",
    autoClose: autoCloseToastNormally,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
