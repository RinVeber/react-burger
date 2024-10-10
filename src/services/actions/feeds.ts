import {createAction} from '@reduxjs/toolkit';
import { WsProps } from '../midleware/WebSoketMidleware';
import { OrderItemProps, RequestProps } from './order';


export interface FeedProps extends RequestProps, WsProps {
    orders: OrderItemProps[],
    total: number,
    totalToday: number,
  }
  

const FEED_WS_CONNECT = 'FEED_WS_CONNECT';
const FEED_WS_DISCONNECT = 'FEED_WS_DISCONNECT';
const FEED_WS_CONNECTING = 'FEED_WS_CONNECTING';
const FEED_WS_ON_OPEN = 'FEED_WS_ON_OPEN';
const FEED_WS_ON_CLOSE = 'FEED_WS_ON_CLOSE';
const FEED_WS_ON_MESSAGE = 'FEED_WS_ON_MESSAGE';
const FEED_WS_ON_ERROR = 'FEED_WS_ON_ERROR';


export const FeedWsConnect = createAction<string, typeof FEED_WS_CONNECT>(FEED_WS_CONNECT);
export const FeedWsDisconnect = createAction(FEED_WS_DISCONNECT);
export const FeedWsConnecting = createAction(FEED_WS_CONNECTING);
export const FeedWsOnOpen = createAction(FEED_WS_ON_OPEN);
export const FeedWsOnClose = createAction<WsProps, typeof FEED_WS_ON_CLOSE>(FEED_WS_ON_CLOSE);
export const FeedWsOnMessage = createAction<FeedProps, typeof FEED_WS_ON_MESSAGE>(FEED_WS_ON_MESSAGE); // receive messages
export const FeedWsOnError = createAction<string, typeof FEED_WS_ON_ERROR>(FEED_WS_ON_ERROR);

export const wsFeedActions = {
    wsConnect: FeedWsConnect,
    wsDisconnect: FeedWsDisconnect,
    wsConnecting: FeedWsConnecting,
    wsOnOpen: FeedWsOnOpen,
    wsOnClose: FeedWsOnClose,
    wsOnMessage: FeedWsOnMessage,
    wsOnError: FeedWsOnError,
  };
  