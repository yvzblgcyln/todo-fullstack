import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    selectedIndex: 0,
    selectedId: 0,
    modal: false,
  },
  reducers: {
    setIndex: (state, action) => {
      state.selectedIndex = action.payload.index;
      state.selectedId = action.payload.id;
    },
    setModal: (state) => {
      state.modal = !state.modal;
    },
  },
});

export const { setIndex, setModal } = modalSlice.actions;
export default modalSlice.reducer;
