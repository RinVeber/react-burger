import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./slices/dataSlice";
import { constructorReducer } from "./slices/constructorSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "./slices/authSlice";
import { authApi } from "./entities/authApi";

const store = configureStore({
  reducer: {
    data: dataReducer,
    burgerConstructor: constructorReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
