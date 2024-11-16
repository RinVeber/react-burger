import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {IFetchedOrderData} from './wsOrderSlice';
import {WS_DEBUG} from '../../utils/data';
import {
  FeedWsConnect,
  FeedWsOnClose,
  FeedWsOnError,
  FeedWsOnMessage,
  FeedWsOnOpen,
} from '../actions/feeds';
import {OrderItemProps} from '../actions/order';

interface State {
  orders: OrderItemProps[];
  wasClean: boolean | null;
  totalToday: number;
  isSuccess: boolean;
  total: number;
  connectingErrorMessage: string;
  status: 'init' | 'loading' | 'success' | 'error' | 'closed';
}

export const defaultWsFeedState: State = {
  orders: [],
  totalToday: 0,
  isSuccess: false,
  total: 0,
  wasClean: null,
  connectingErrorMessage: '',
  status: 'init',
};

export const wsFeedSlice = createSlice({
  name: 'wsFeed',
  initialState: defaultWsFeedState,
  reducers: {
    wsFeedCloseAction: (state, action) => {
      state.orders = [];
      state.connectingErrorMessage = '';
    },
    wsFeedErrorAction: (state, action) => {
      state.connectingErrorMessage = action.payload;
    },
    wsFeedMessageAction: (state, action) => {
      state.orders = action.payload.orders;
    },
  },
  selectors: {
    takeIsSuccess: (state) => state.isSuccess,
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder
      .addCase(FeedWsConnect, (state) => {
        if (WS_DEBUG) {
          console.log('feedReducer:wsConnecting');
        }

        state.status = 'loading';
        state.wasClean = null;
      })
      .addCase(FeedWsOnOpen, (state) => {
        if (WS_DEBUG) {
          console.log('feedReducer:wsOnOpen');
        }
      })
      .addCase(FeedWsOnError, (state, action) => {
        if (WS_DEBUG) {
          console.log('feedReducer:wsOnError', action);
        }

        state.status = 'error';

        state.orders = [];
      })
      .addCase(FeedWsOnClose, (state, action) => {
        if (WS_DEBUG) {
          console.log('feedReducer:wsOnClose', action);
        }

        state.status = 'closed';
        state.wasClean = action.payload.wasClean;
      })
      .addCase(FeedWsOnMessage, (state, action) => {
        if (WS_DEBUG) {
          console.log('feedReducer:wsOnMessage', action.payload);
        }

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

export const {wsFeedCloseAction, wsFeedErrorAction, wsFeedMessageAction} =
  wsFeedSlice.actions;
export const {takeIsSuccess} = wsFeedSlice.selectors;
export const wsFeedReducer = wsFeedSlice.reducer;
