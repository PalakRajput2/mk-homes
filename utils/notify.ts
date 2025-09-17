import { toast } from "react-hot-toast";

export const MESSAGE_TYPE = {
  ERROR: "error",
  SUCCESS: "success",
};

export const showMessage = (msg = "", type = MESSAGE_TYPE.SUCCESS) => {
  if (type === MESSAGE_TYPE.ERROR) {
    toast.error(msg);
  } else {
    toast.success(msg);
  }
};