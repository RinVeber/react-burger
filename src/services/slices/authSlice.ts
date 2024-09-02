import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  sendChangeUserInfoRequestAction,
  sendEmailAction,
  sendLogoutRequestAction,
  sendResetPassRequestAction,
  sendUserInfoRequestAction,
} from "../actions/actions";
import { RegisterResponse } from "../entities/authApi";
import { getCookie } from "../../utils/helper-function/cockie";

interface State {
  userInfoSuccess: boolean | null;
  changeUserInfoSuccess: boolean | null;
  accessToken: string | null;
  refreshToken: string | null;
  password: string | null;
  registrSuccess: boolean | null;
  loginFail: boolean | null;
  userInfo: any;
  isLoginSuccess: boolean | null;
  forgotPassSuccess: boolean | null;
  forgotPassMessage: any;
  resetPassSuccess: boolean | null;
  resetPassMessage: string | null;
  logoutSuccess: boolean | null;
  success: boolean;
  errorMessage: unknown;
  status: "init" | "loading" | "success" | "error";
}

const constructorState: State = {
  userInfoSuccess: null,
  changeUserInfoSuccess: null,
  accessToken: getCookie("accessToken") || null,
  refreshToken: getCookie("refreshToken") || null,
  password: null,
  registrSuccess: null,
  isLoginSuccess: null,
  loginFail: null,
  userInfo: null,
  forgotPassMessage: null,
  resetPassSuccess: null,
  forgotPassSuccess: null,
  resetPassMessage: null,
  logoutSuccess: null,
  success: false,
  errorMessage: null,
  status: "init",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: constructorState,
  reducers: {
    setUserAction: (state, action: PayloadAction<RegisterResponse>) => {
      const { userInfo, accessToken, refreshToken, success } = action.payload;
      state.userInfo = userInfo;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.success = success;
      state.isLoginSuccess = true;
    },
    clearUserAction: (state) => {
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder
      .addCase(sendUserInfoRequestAction.fulfilled, (state, action) => {
        state.userInfo = {
          ...state.userInfo,
          name: action.payload.user.name,
          email: action.payload.user.email,
        };
        state.userInfoSuccess = true;
        state.status = "success";
      })
      .addCase(sendUserInfoRequestAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendUserInfoRequestAction.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.userInfoSuccess = false;
        state.success = false;
        state.status = "error";
      })
      .addCase(sendChangeUserInfoRequestAction.fulfilled, (state, action) => {
        state.userInfo = {
          ...state.userInfo,
          name: action.payload.user.name,
          email: action.payload.user.email,
        };
        state.changeUserInfoSuccess = true;
        state.status = "success";
      })
      .addCase(sendChangeUserInfoRequestAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendChangeUserInfoRequestAction.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.changeUserInfoSuccess = false;
        state.success = false;
        state.status = "error";
      })
      .addCase(sendEmailAction.fulfilled, (state, action) => {
        state.forgotPassSuccess = true;
        state.forgotPassMessage = action.payload.message;
        state.status = "success";
      })
      .addCase(sendEmailAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendEmailAction.rejected, (state, action) => {
        state.forgotPassSuccess = false;
        state.forgotPassMessage = `Не удалось изменить пароль: ${action.payload}`;
        state.success = false;
        state.status = "error";
      })
      .addCase(sendResetPassRequestAction.fulfilled, (state, action) => {
        state.resetPassMessage = action.payload.message;
        state.resetPassSuccess = true;
        state.status = "success";
      })
      .addCase(sendResetPassRequestAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendResetPassRequestAction.rejected, (state, action) => {
        state.resetPassMessage = "Не удалось изменить пароль";
        state.resetPassSuccess = false;
        state.success = false;
        state.status = "error";
      })
      .addCase(sendLogoutRequestAction.fulfilled, (state, action) => {
        state.logoutSuccess = true;
        state.status = "success";
      })
      .addCase(sendLogoutRequestAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendLogoutRequestAction.rejected, (state, action) => {
        state.logoutSuccess = false;
        state.success = false;
        state.status = "error";
      });
  },
});

export const { setUserAction, clearUserAction } = authSlice.actions;
export const authReducer = authSlice.reducer;
