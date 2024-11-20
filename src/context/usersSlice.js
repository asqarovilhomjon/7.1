import { createSlice } from "@reduxjs/toolkit";

// Load users from localStorage (if available)
const loadFromLocalStorage = () => {
  const storedUsers = localStorage.getItem("users");
  return storedUsers ? JSON.parse(storedUsers) : [];
};

// Save users to localStorage
const saveToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    value: loadFromLocalStorage(),
  },
  reducers: {
    addToUsers(state, action) {
      state.value = [...state.value, action.payload];
      saveToLocalStorage(state.value); 
    },
    removeFromUsers(state, action) {
      state.value = state.value.filter(user => user.id !== action.payload.id);
      saveToLocalStorage(state.value); 
    },
    editUser(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.value.findIndex(user => user.id === id);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...updatedData };
        saveToLocalStorage(state.value); 
      }
    },
  },
});

export const { addToUsers, removeFromUsers, editUser } = usersSlice.actions;
export default usersSlice.reducer;
