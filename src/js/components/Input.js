import store from "../data";
import { getLiveboard } from "../data/trains";

export default class Input {
  constructor(holder) {
    this.holder = holder;
    this.ref = this.init();
    this.list;
    this.setEvents();
  }
  init() {
    this.holder.innerHTML = `
    <h2>Where would you like to start?</h2>
    <input type="text" id="searchInput" autocomplete="off">
    <ul id="searchResults"></ul>
    `;
    this.list = document.querySelector("#searchResults");
    return document.querySelector("#searchInput");
  }
  render(value) {
    if (value.length > 1) {
      const { allStations } = store.getState().trainSlice;
      const regex = new RegExp(value, "i");
      this.list.innerHTML = allStations
        .filter((station) => station.name.match(regex))
        .map((station) => `<li data-id=${station.id}>${station.name}</li>`)
        .join("");
    }
  }
  setEvents() {
    this.ref.onkeyup = () => {
      this.render(this.ref.value);
    };
    this.list.onclick = (e) => {
      if (e.target.dataset.id) store.dispatch(getLiveboard(e.target.dataset.id));
    };
  }
}
