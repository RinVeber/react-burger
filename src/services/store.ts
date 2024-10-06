import {configureStore, ThunkAction} from '@reduxjs/toolkit';
import {dataReducer} from './slices/dataSlice';
import {constructorReducer} from './slices/constructorSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {authReducer} from './slices/authSlice';
import {authApi} from './entities/authApi';
import {orderReducer} from './slices/orderSlice';
import {webSocketMiddleware} from './midleware/WebSoketMidleware';
import { wsFeedReducer } from './slices/wsFeedSlice';
import { wsOrderReducer } from './slices/wsOrderSlice';
import { wsOrdersActions } from './actions/order';
import { wsFeedActions } from './actions/feeds';


const store = configureStore({
  reducer: {
    data: dataReducer,
    burgerConstructor: constructorReducer,
    auth: authReducer,
    socket: wsOrderReducer,
    order: orderReducer,
    feed: wsFeedReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      webSocketMiddleware(wsOrdersActions),
      webSocketMiddleware(wsFeedActions),
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

