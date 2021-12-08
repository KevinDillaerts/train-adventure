import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import trainSlice from "./trains";

const rootReducer = {
  trainSlice,
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
