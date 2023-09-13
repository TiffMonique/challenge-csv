import { ToastOptions, toast } from "react-toastify";

interface PromiseMessages { 
  pending: string;
  success: string;
  error: string;
}

export const showMessage = (message: string, body: ToastOptions = {}) => { 
  return toast(message, {
    ...body,
    position: toast.POSITION.BOTTOM_RIGHT,
  });
}

export const showPromise = (promise: any, messages: PromiseMessages) => {
  return toast.promise(promise, messages)
}

export const showSuccess = (message: string, body: ToastOptions = {}) => { 
  return toast.success(message, {
    ...body,
    position: toast.POSITION.BOTTOM_RIGHT,
  });
}
export const showError = (message: string, body: ToastOptions = {}) => { 
  return toast.error(message, {
    ...body,
    position: toast.POSITION.BOTTOM_RIGHT,
  });
}
export const showLoading = (message: string) => {
  return toast.loading(message);
}

export const showDismiss = (id:any) => {
  return toast.dismiss(id);
}