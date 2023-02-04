import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
  },
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("user", action.payload);
    },
  },
});

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;
