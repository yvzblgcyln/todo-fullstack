import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import modalReducer from "./modalSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    modal: modalReducer,
    user: userReducer,
  },
});
