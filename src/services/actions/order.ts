import {createAction} from '@reduxjs/toolkit';
import {WsProps} from '../midleware/WebSoketMidleware';
import {IDataItem} from '../../utils/data';

export type StatusTypes = 'init' | 'loading' | 'error' | 'closed';

export interface OrderServerProps {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
}

export interface OrderItemProps extends OrderServerProps {
  items: IDataItem[];
}

export interface RequestProps {
  status: StatusTypes;
  error: unknown;
  success: boolean;
}

export interface OrdersProps extends RequestProps, WsProps {
  orders: OrderItemProps[];
  total: number;
  totalToday: number;
}

const ORDERS_WS_CONNECT = 'ORDERS_WS_CONNECT';
const ORDERS_WS_DISCONNECT = 'ORDERS_WS_DISCONNECT';
const ORDERS_WS_CONNECTING = 'ORDERS_WS_CONNECTING';
const ORDERS_WS_ON_OPEN = 'ORDERS_WS_ON_OPEN';
const ORDERS_WS_ON_CLOSE = 'ORDERS_WS_ON_CLOSE';
const ORDERS_WS_ON_MESSAGE = 'ORDERS_WS_ON_MESSAGE';
const ORDERS_WS_ON_ERROR = 'ORDERS_WS_ON_ERROR';


export const OrderWsConnect = createAction<string, typeof ORDERS_WS_CONNECT>(
  ORDERS_WS_CONNECT,
);
export const OrderWsDisconnect = createAction(ORDERS_WS_DISCONNECT);
export const OrderWsConnecting = createAction(ORDERS_WS_CONNECTING);
export const OrderWsOnOpen = createAction(ORDERS_WS_ON_OPEN);
export const OrderWsOnClose = createAction<WsProps, typeof ORDERS_WS_ON_CLOSE>(
  ORDERS_WS_ON_CLOSE,
);
export const OrderWsOnMessage = createAction<
  OrdersProps,
  typeof ORDERS_WS_ON_MESSAGE
>(ORDERS_WS_ON_MESSAGE);
export const OrderWsOnError = createAction<string, typeof ORDERS_WS_ON_ERROR>(
  ORDERS_WS_ON_ERROR,
);

export const wsOrdersActions = {
    wsConnect: OrderWsConnect,
    wsDisconnect: OrderWsDisconnect,
    wsConnecting: OrderWsConnecting,
    wsOnOpen: OrderWsOnOpen,
    wsOnClose: OrderWsOnClose,
    wsOnMessage: OrderWsOnMessage,
    wsOnError: OrderWsOnError,
  };