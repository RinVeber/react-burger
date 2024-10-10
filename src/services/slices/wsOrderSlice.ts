import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {IDataItem, WS_DEBUG} from '../../utils/data';
import {
  OrderItemProps,
  OrderWsConnecting,
  OrderWsOnClose,
  OrderWsOnError,
  OrderWsOnMessage,
  OrderWsOnOpen,
} from '../actions/order';

interface IWsStatus {
  online: string;
  offline: string;
  connecting: string;
}

export const WS_STATUS: IWsStatus = {
  online: 'online',
  offline: 'offline',
  connecting: 'connecting',
};

export interface IFetchOrderResponse {
  success?: boolean;
  orders: IFetchedOrderData[];
}

export interface IUser {
  email: string | undefined;
  name: string | undefined;
}

export interface IOwner extends IUser {
  createdAt: string;
  updatedAt: string;
}

export interface IMyOrder {
  success?: boolean;
  name: string;
  order: {
    createdAt: string;
    updatedAt: string;
    ingredients: IDataItem[];
    name: string;
    number: number;
    owner: IOwner;
    price: number;
    status: string;
    _id: string;
  };
}

export interface IFetchedOrderData {
  createdAt: string;
  updatedAt: string;
  status: string;
  owner: string;
  name: string;
  number: number;
  ingredients: string[];
  _id: string;
  __v: number;
}

interface State {
  orders: OrderItemProps[];
  total: number;
  isSuccess: boolean;
  code: number | null;
  wasClean: boolean | null;
  totalToday: number;
  connectingErrorMessage: string;
  status: 'init' | 'loading' | 'success' | 'error' | 'closed';
}

const wsOrderState: State = {
  orders: [],
  total: 0,
  code: 0,
  isSuccess: false,
  wasClean: null,
  totalToday: 0,
  connectingErrorMessage: '',
  status: 'init',
};

export const wsOrderSlice = createSlice({
  name: 'wsOrder',
  initialState: wsOrderState,
  reducers: {},
  selectors: {
    takeIsSuccess: (state) => state.isSuccess,
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder
      .addCase(OrderWsConnecting, (state) => {
        state.status = 'loading';
      })
      .addCase(OrderWsOnOpen, (state) => {
        console.log('wsOnOpen');
      })
      .addCase(OrderWsOnError, (state, action) => {
        state.orders = [];
        state.status = 'error';
      })
      .addCase(OrderWsOnClose, (state, action) => {
        state.status = 'closed';
        state.wasClean = action.payload.wasClean;
        state.code = action.payload.code;
      })

      .addCase(OrderWsOnMessage, (state, action) => {
        state.status = 'init';

        if (action.payload.orders && action.payload.orders.length) {
          state.orders = action.payload.orders;
          state.isSuccess = true;
        } else {
          state.orders = [];
        }

        state.total = action.payload.total ?? 0;
        state.totalToday = action.payload.totalToday ?? 0;
      });
  },
});

export const {} = wsOrderSlice.actions;
export const {takeIsSuccess} = wsOrderSlice.selectors;
export const wsOrderReducer = wsOrderSlice.reducer;
