import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {IFetchedOrderData, IMyOrder} from './wsOrderSlice';
import {getOrderDataAction} from '../actions/actions';

interface State {
  orderDetails: IMyOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
  orderErrMsg: string;

  currentOrderDetails: IFetchedOrderData | null;
  currentOrderRequest: boolean;
  currentOrderFailed: boolean;
  currentOrderErrMsg: string;
  selectedIngredient: string | number | null;
  status: 'init' | 'loading' | 'success' | 'error';
}

const orderState: State = {
  orderDetails: null,
  orderRequest: false,
  orderFailed: false,
  orderErrMsg: '',
  selectedIngredient: null,
  currentOrderDetails: null,
  currentOrderRequest: false,
  currentOrderFailed: false,
  currentOrderErrMsg: '',
  status: 'init',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderState,
  reducers: {
    chooseItemForModalPageAction: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    removeItemForModalPageAction: (state) => {
        state.selectedIngredient = null;
      },
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder
      .addCase(getOrderDataAction.fulfilled, (state, action) => {
        state.currentOrderRequest = true;
        state.currentOrderDetails = action.payload.orders[0];
        state.currentOrderErrMsg = '';
        state.status = 'success';
      })
      .addCase(getOrderDataAction.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getOrderDataAction.rejected, (state, action) => {
        (state.currentOrderRequest = false),
          (state.currentOrderFailed = true),
          (state.currentOrderErrMsg = `Shit happens ${action.payload}`),
          (state.status = 'error');
      });
  },
});

export const {chooseItemForModalPageAction, removeItemForModalPageAction} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
