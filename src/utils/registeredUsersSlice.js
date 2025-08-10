// import { createSlice } from "@reduxjs/toolkit";

// const registeredUsersSlice = createSlice({
//   name: "registeredUsers",
//   initialState: [],
//   reducers: {
//     registerUser: (state, action) => {
//       if (!state.includes(action.payload)) {
//         state.push(action.payload);
//       }
//     },
//   },
// });

// export const { registerUser } = registeredUsersSlice.actions;
// export default registeredUsersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem("registeredUsers");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (state) => {
  localStorage.setItem("registeredUsers", JSON.stringify(state));
};

const registeredUsersSlice = createSlice({
  name: "registeredUsers",
  initialState: loadFromStorage(),
  reducers: {
    registerUser: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
        saveToStorage(state);
      }
    },
  },
});

export const { registerUser } = registeredUsersSlice.actions;
export default registeredUsersSlice.reducer;
