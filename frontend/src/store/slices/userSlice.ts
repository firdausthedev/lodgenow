import { createSlice } from "@reduxjs/toolkit";

const clearUserLocalStorage = () => {
  const storedData = localStorage.getItem("lodgenow");

  if (storedData) {
    const parsedData = JSON.parse(storedData);
    delete parsedData.token;
    delete parsedData.role;
    localStorage.setItem("lodgenow", JSON.stringify(parsedData));
  }
};

export const getValueFromLocalStorage = (key: string): string | null => {
  const storedData = localStorage.getItem("lodgenow");

  if (storedData) {
    const parsedData = JSON.parse(storedData);
    return parsedData[key] || null;
  } else {
    return null;
  }
};

interface UserState {
  token: string | null;
  role: string | null;
}

const initialState: UserState = {
  token: getValueFromLocalStorage("token"),
  role: getValueFromLocalStorage("role"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem(
        "lodgenow",
        JSON.stringify({
          token: action.payload.token,
          role: action.payload.role,
        }),
      );
    },
    logout: state => {
      state.token = null;
      state.role = null;
      clearUserLocalStorage();
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: { user: UserState }) => state.user;
