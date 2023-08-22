import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  username: string;
  password: string;
}

interface AuthState {
  isLoginError: boolean;
  isLoginLoading: boolean;
  user: string | null;
  statusMessage: string | null;
}

const initialState: AuthState = {
  isLoginError: false,
  isLoginLoading: false,
  user: null,
  statusMessage: null,
};

export const handleLogin = createAsyncThunk<any, {user: User}>(
  "user/login",
  async ({user}, {rejectWithValue}) => {
    try {
      const url = "http://localhost/LSTV-TS/backend/login.php";
      const formData = new URLSearchParams();
      const {username, password} = user;
      formData.append("username", username);
      formData.append("password", password);

      const {data: res} = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleUserActive: (state) => {
      state.user = localStorage.getItem("token");
    },
    handleClearUserStatus: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.isLoginLoading = true;
        state.isLoginError = false;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        console.log(action.payload);
        const {username} = action.payload;
        state.isLoginLoading = false;
        state.isLoginError = false;
        state.user = username;
        localStorage.setItem("token", username);
      })
      .addCase(handleLogin.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoginLoading = false;
        state.isLoginError = true;
        // state.statusMessage = action.payload.message;
      });
  },
});

export const {handleUserActive, handleClearUserStatus} = authSlice.actions;

export default authSlice.reducer;
