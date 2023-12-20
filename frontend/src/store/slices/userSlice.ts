import { createSlice } from "@reduxjs/toolkit";

interface userStae {
  username: string;
  password: string;
}

const initialState: userStae = {
  username: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
});

export default userSlice.reducer;
