import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppConfig } from "../../types";

interface ConfigState {
  dealers?: string[];
}

const initialState: ConfigState = {
  dealers: undefined,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<AppConfig>) => {
      state.dealers = action.payload.dealers;
    },
  },
});

export const { setConfig } = configSlice.actions;
export default configSlice.reducer;
