import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/data";
import { getCookie, setCookie } from "../../utils/helper-function/cockie";

export interface IUserInfo {
  name: string;
  email: string;
  password?: string;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: IUserInfo;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<
      RegisterResponse,
      { email: string; password: string }
    >({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }),
      transformResponse: (response: RegisterResponse) => {
        if (response.success) {
          setCookie("accessToken", response.accessToken);
          setCookie("refreshToken", response.refreshToken);
        }
        return response;
      },
    }),
    register: builder.mutation<
      RegisterResponse,
      { email: string; name: string; password: string }
    >({
      query: ({
        email,
        password,
        name,
      }: {
        email: string;
        name: string;
        password: string;
      }) => ({
        url: "auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      }),
      transformResponse: (response: RegisterResponse) => {
        if (response.success) {
          setCookie("accessToken", response.accessToken);
          setCookie("refreshToken", response.refreshToken);
        }
        return response;
      },
    }),
    logout: builder.mutation<
      { message: string; success: boolean },
      { token: string | undefined }
    >({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: getCookie("refreshToken") }),
      }),
      transformResponse: (response: { message: string; success: boolean }) => {
        return response;
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
