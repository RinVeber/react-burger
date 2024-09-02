import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
  sendChangeUserInfoRequestAction,
  sendUserInfoRequestAction,
} from "../actions/actions";

interface State {
  userInfoSuccess: boolean | null;
  changeUserInfoSuccess: boolean | null;
  userInfo: any;
  success: boolean;
  errorMessage: unknown;
  status: "init" | "loading" | "success" | "error";
}

const profileState: State = {
  userInfoSuccess: null,
  changeUserInfoSuccess: null,
  userInfo: null,
  success: false,
  errorMessage: null,
  status: "init",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: profileState,
  reducers: {},
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
      });
  },
});

export const {} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
