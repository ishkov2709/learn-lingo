import { Bounce, Zoom, toast } from "react-toastify";

export const notifyError = (error: string) =>
  toast.error(error, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
  });

export const notifySuccess = (email: string) =>
  toast.success(`A verification letter was sent to email ${email}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
  });
