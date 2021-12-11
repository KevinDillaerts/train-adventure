import store from "../data";
import { getLiveboard } from "../data/trains";

export default class Input {
  constructor(holder) {
    this.holder = holder;
    this.ref;
    this.list;
    store.subscribe(this.render.bind(this));
  }
  render() {
    if (store.getState().trainSlice.display === "startSearch") {
      this.holder.innerHTML = `
      <h2>Kies jouw start-station</h2>
      <input id="searchInput" autocomplete="off">
      <ul id="searchResults"></ul>`;
      this.list = document.querySelector("#searchResults");
      this.ref = document.querySelector("#searchInput");
      this.setEvents();
    }
  }
  showList(value) {
    if (value.length > 1) {
      const { allStations } = store.getState().trainSlice;
      const regex = new RegExp(value, "i");
      this.list.innerHTML = allStations
        .filter((station) => station.name.match(regex))
        .map((station) => `<li data-id=${station.id}>${station.name}</li>`)
        .join("");
    } else {
      this.list.innerHTML = "";
    }
  }
  setEvents() {
    this.ref.onkeyup = () => {
      this.showList(this.ref.value);
    };
    this.list.onclick = (e) => {
      if (e.target.dataset.id) store.dispatch(getLiveboard(e.target.dataset.id));
    };
  }
}
