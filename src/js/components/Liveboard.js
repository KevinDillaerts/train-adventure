import store from "../data";
import { getStops } from "../data/trains";

export default class Liveboard {
  constructor(holder) {
    this.holder = holder;
    this.list;
    this.current;
    this.render;
    this.setEvents;
    store.subscribe(this.render.bind(this));
  }
  render() {
    const { liveboard, display } = store.getState().trainSlice;
    if (display === "showLiveboard") {
      this.holder.innerHTML = `
      <h2>Kies een trein uit het vertrekbord</h2>
      <ul id="liveboard">
      ${liveboard.map((train) => `<li data-id=${train.vehicle}>${train.station}</li>`).join("")}
      </ul>`;
      this.list = document.querySelector("#liveboard");
      this.setEvents();
    }
  }
  setEvents() {
    this.list.onclick = (e) => {
      store.dispatch(getStops(e.target.dataset.id));
    };
  }
}
