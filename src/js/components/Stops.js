import store from "../data";
import { getLiveboard } from "../data/trains";

export default class Stops {
  constructor(holder) {
    this.holder = holder;
    this.list;
    this.render;
    this.setEvents;
    store.subscribe(this.render.bind(this));
  }
  render() {
    const { stops, display } = store.getState().trainSlice;
    if (display === "showStops") {
      this.holder.innerHTML = `
        <h2>Where would you like exit the train?</h2>
        <ul id="stops">
        ${stops.map((stop) => `<li data-id=${stop.stationinfo.id}>${stop.station}</li>`).join("")}
        </ul>`;
      this.list = document.querySelector("#stops");
      this.setEvents();
    }
  }
  setEvents() {
    this.list.onclick = (e) => {
      store.dispatch(getLiveboard(e.target.dataset.id));
    };
  }
}
