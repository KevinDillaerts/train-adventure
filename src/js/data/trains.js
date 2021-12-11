import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios");
import store from "../data";
import { toastError } from "../components/toastError";

const initialState = {
  display: null,
  liveboard: [],
  allStations: [],
  stops: [],
};

export const getAllStations = createAsyncThunk("trains/getAllStations", async () => {
  const {
    data: { station },
  } = await axios("https://api.irail.be/stations/?format=json&lang=nl");
  return station;
});

export const getLiveboard = createAsyncThunk("trains/getLiveboard", async (id) => {
  const {
    data: {
      departures: { departure },
    },
  } = await axios(
    `https://api.irail.be/liveboard/?id=${id}&time=0930&lang=nl&format=json&alerts=false`
  );
  const uniqueDepartures = [
    ...new Map(departure.map((train) => [train["station"], train])).values(),
  ];
  return { uniqueDepartures, id };
});

export const getStops = createAsyncThunk("trains/getStops", async (id) => {
  const {
    data: {
      stops: { stop },
    },
  } = await axios(`https://api.irail.be/vehicle/?id=${id}&format=json&lang=nl&alerts=false`);
  const { current } = store.getState().trainSlice;
  const index = stop.findIndex((stop) => stop.stationinfo.id === current);
  return stop.slice(index + 1);
});

const trainSlice = createSlice({
  name: "trains",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllStations.pending]: (state) => {
      state.display = "loading";
    },
    [getAllStations.rejected]: (state) => {
      state.display = null;
      toastError("Er liep iets mis met het laden, probeer opnieuw");
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    [getAllStations.fulfilled]: (state, action) => {
      state.display = "startSearch";
      state.allStations = action.payload;
    },
    [getLiveboard.pending]: (state) => {
      state.display = "loading";
    },
    [getLiveboard.rejected]: (state) => {
      toastError("Oeps, we konden geen data vinden. Probeer opnieuw of kies een ander station.");
      state.display = "startSearch";
    },
    [getLiveboard.fulfilled]: (state, action) => {
      state.display = "showLiveboard";
      state.liveboard = action.payload.uniqueDepartures;
    },
    [getStops.pending]: (state) => {
      state.display = "loading";
    },
    [getStops.rejected]: (state) => {
      toastError("Oeps, we konden geen data vinden. Probeer opnieuw of kies een andere richting.");
      state.display = "showLiveboard";
    },
    [getStops.fulfilled]: (state, action) => {
      state.display = "showStops";
      state.stops = action.payload;
    },
  },
});

export default trainSlice.reducer;
