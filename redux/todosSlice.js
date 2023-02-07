import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async () => {
  const data = await fetch("http://localhost:5000/get").then((res) => res.json());
  return data;
});

export const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    setTodos: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) state[i] = action.payload[i];
    },
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.splice(action.payload, 1);
    },
    toggleTodo: (state, action) => {
      state[action.payload].completed = !state[action.payload].completed;
    },
    update: (state, action) => {
      state[action.payload.index].todo = action.payload.input;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      for (let i = 0; i < action.payload.length; i++) state[i] = action.payload[i];
    });
  },
});

export const { setTodos, addTodo, removeTodo, toggleTodo, update } = todosSlice.actions;
export default todosSlice.reducer;
