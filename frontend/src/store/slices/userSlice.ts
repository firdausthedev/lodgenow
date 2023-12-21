import { createSlice } from "@reduxjs/toolkit";
import { getToken, clearToken, setToken } from "../../components/utils/auth";

interface UserState {
  token: string | null;
}

const initialState: UserState = {
  token: getToken(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      setToken(action.payload);
    },
    clearUserToken: state => {
      state.token = null;
      clearToken();
    },
  },
});

export const { setUserToken, clearUserToken } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: { user: UserState }) => state.user;
