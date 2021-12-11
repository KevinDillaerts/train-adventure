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
      <div class="loading">
        <lottie-player
        src="https://assets3.lottiefiles.com/packages/lf20_fhBdev.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: auto"
        loop
        autoplay
        ></lottie-player>
      </div>`;
    }
  }
}
