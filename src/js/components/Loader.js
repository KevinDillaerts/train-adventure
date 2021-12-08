import store from "../data";

export default class Loader {
  constructor(holder) {
    this.holder = holder;
    store.subscribe(this.render.bind(this));
  }
  render() {
    const { display } = store.getState().trainSlice;
    if (display === "loading") {
      this.holder.innerHTML = `
        <lottie-player
        src="https://assets2.lottiefiles.com/packages/lf20_zizREI.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
        ></lottie-player>`;
    }
  }
}
