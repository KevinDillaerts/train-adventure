import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios");
import store from "../data";

const initialState = {
  error: false,
  display: null,
  current: null,
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
  } = await axios(`https://api.irail.be/liveboard/?id=${id}&lang=nl&format=json&alerts=false`);
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
      state.error = false;
    },
    [getAllStations.fulfilled]: (state, action) => {
      state.display = "startSearch";
      state.allStations = action.payload;
    },
    [getLiveboard.pending]: (state) => {
      state.display = "loading";
      state.error = false;
    },
    [getLiveboard.fulfilled]: (state, action) => {
      state.current = action.payload.id;
      state.display = "showLiveboard";
      state.liveboard = action.payload.uniqueDepartures;
    },
    [getStops.pending]: (state) => {
      state.display = "loading";
      state.error = false;
    },
    [getStops.fulfilled]: (state, action) => {
      state.display = "showStops";
      state.stops = action.payload;
    },
  },
});

export default trainSlice.reducer;
