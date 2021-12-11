import Toastify from "toastify-js";

export const toastError = () => {
  Toastify({
    text: "Oeps, we konden geen data vinden. Probeer opnieuw of kies een ander station.",
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
