import "../css/style.scss";
import store from "./data";
import { getAllStations } from "./data/trains";
import Startscreen from "./components/Startscreen";
import Input from "./components/Input";
import Loader from "./components/Loader";
import Liveboard from "./components/Liveboard";
import Stops from "./components/Stops";

const app = document.getElementById("app");

export const initialize = async () => {
  await store.dispatch(getAllStations());
  new Input(app);
  new Loader(app);
  new Liveboard(app);
  new Stops(app);
};

new Startscreen(app);
