import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import forumSlice from "../components/forum/_common/forumSlice";

export const store = configureStore({
  reducer: {
    forum: forumSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
