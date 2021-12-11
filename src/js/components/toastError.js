import Toastify from "toastify-js";

export const toastError = (text) => {
  Toastify({
    text: text,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "red",
    },
  }).showToast();
};
