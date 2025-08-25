import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "light", // Default Light Mode
  layout: localStorage.getItem("layout") || "vertical", // Default Vertical Layout
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload); // LocalStorage এ সেভ হবে
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
      localStorage.setItem("layout", action.payload);
    },
  },
});

export const { setTheme, setLayout } = themeSlice.actions;
export default themeSlice.reducer;
