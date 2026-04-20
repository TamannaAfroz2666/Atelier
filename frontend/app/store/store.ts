import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./board/boardSlice";
import boardImageReducer from "./board/boardImageSlice";

export const store = configureStore({
  reducer: {
   board: boardReducer,
    boardImage: boardImageReducer,
  },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
