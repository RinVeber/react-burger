import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadDataFailAction } from "../slices/dataSlice";
import { loadOrderFailAction } from "../slices/constructorSlice";
import { request } from "../../utils/helper-function/checkResponse";
import { getCookie, setCookie } from "../../utils/helper-function/cockie";
import { fetchWithRefresh } from "../../utils/helper-function/fetchWithRefresh";

export const sendOrderAction = createAsyncThunk(
  "constructor/sendOrderAction",
  async (data: string[], { dispatch }) => {
    const response = await request(`/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: data }),
    });

    if (response.success) {
      return response;
    } else {
      dispatch(loadOrderFailAction(response));
    }
  }
);

export const getAllIngredientsAction = createAsyncThunk(
  "data/getAllIngredientsAction",
  async (_, { dispatch, rejectWithValue }) => {
    const response = await request(`/ingredients`, {
      method: "GET",
    });

    if (response.success) {
      return response;
    } else {
      dispatch(loadOrderFailAction(loadDataFailAction));
    }
    return rejectWithValue
  }
);

export const sendEmailAction = createAsyncThunk(
  "auth/sendEmailAction",
  async ({ email }: { email: string }, { dispatch, rejectWithValue }) => {
    const response = await request(`/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    if (response.success) {
      return response;
    }
    return rejectWithValue;
  }
);

export const sendResetPassRequestAction = createAsyncThunk(
  "auth/sendResetPassRequestAction",
  async (
    { password, code }: { password: string; code: string },
    { dispatch, rejectWithValue }
  ) => {
    const response = await request(`/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password, token: code }),
    });

    if (response.success) {
      return response;
    }
    return rejectWithValue;
  }
);

export const sendLogoutRequestAction = createAsyncThunk(
  "auth/sendLogoutRequestAction",
  async (_, { dispatch, rejectWithValue }) => {
    const response = await request(`/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });

    if (response.success) {
      return response;
    }

    return rejectWithValue;
  }
);

export const sendChangeUserInfoRequestAction = createAsyncThunk(
  "auth/sendChangeUserInfoRequestAction",
  async ({ name, email, password }: any, { dispatch }) => {
    const token = getCookie("accessToken");
    return fetchWithRefresh(`/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token as string,
      },
      body: JSON.stringify({ name, email, password }),
    });
  }
);

export const sendUserInfoRequestAction = createAsyncThunk(
  "auth/sendUserInfoRequestAction",
  async (_, { dispatch, rejectWithValue }) => {
    const response = await request(`/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie("accessToken"),
      } as HeadersInit ,
    });

    if (response.success) {
      return response;
    }
    return rejectWithValue;
  }
);
