import {createAsyncThunk} from '@reduxjs/toolkit';
import {request} from '../../utils/helper-function/checkResponse';
import {getCookie, setCookie} from '../../utils/helper-function/cockie';
import {fetchWithRefresh} from '../../utils/helper-function/fetchWithRefresh';
import {IUserInfo} from '../entities/authApi';
import {IDataItem} from '../../utils/data';
import {IFetchOrderResponse} from '../slices/wsOrderSlice';

export interface ServerResponse {
  success: boolean;
}

interface ResponseServer<T> extends ServerResponse {
  data: T extends IDataItem ? T : never;
  user: T extends IUserInfo ? T : never;
  message?: string;
}

interface ResponseServerOrder extends ServerResponse {
  name: string;
  order: {number: number};
}

interface OrderData {
  ingredients: string[];
}

interface ResponseServerMain extends ServerResponse {
  message: string;
}

export const sendOrderAction = createAsyncThunk<ResponseServerOrder, OrderData>(
  'constructor/sendOrderAction',
  async (data: OrderData, {dispatch}) => {
    const token = getCookie('accessToken')!.split(' ')[1];
    const response = await request(`/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: ('Bearer ' + token) as string,
      },
      body: JSON.stringify(data),
    });

    return response;
  },
);

export const getAllIngredientsAction = createAsyncThunk<
  ResponseServer<IDataItem[]>
>('data/getAllIngredientsAction', async (_, {dispatch, rejectWithValue}) => {
  const response = await request(`/ingredients`, {
    method: 'GET',
  });

  return response;
});

export const sendEmailAction = createAsyncThunk<
  ResponseServerMain,
  {email: string}
>(
  'auth/sendEmailAction',
  async ({email}: {email: string}, {dispatch, rejectWithValue}) => {
    const response = await request(`/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email}),
    });

    return response;
  },
);

export const sendResetPassRequestAction = createAsyncThunk<
  ResponseServerMain,
  {password: string; code: string}
>(
  'auth/sendResetPassRequestAction',
  async (
    {password, code}: {password: string; code: string},
    {dispatch, rejectWithValue},
  ) => {
    const response = await request(`/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password: password, token: code}),
    });

    return response;
  },
);

export const sendLogoutRequestAction = createAsyncThunk<ResponseServerMain>(
  'auth/sendLogoutRequestAction',
  async (_, {dispatch, rejectWithValue}) => {
    const response = await request(`/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: getCookie('refreshToken')}),
    });

    return response;
  },
);

export const sendChangeUserInfoRequestAction = createAsyncThunk<
  ResponseServer<IUserInfo>,
  IUserInfo
>(
  'auth/sendChangeUserInfoRequestAction',
  async ({name, email, password}: IUserInfo, {dispatch}) => {
    const token = getCookie('accessToken');
    return fetchWithRefresh(`/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: token as string,
      },
      body: JSON.stringify({name, email, password}),
    });
  },
);

export const sendUserInfoRequestAction = createAsyncThunk<
  ResponseServer<IUserInfo>
>('auth/sendUserInfoRequestAction', async (_, {dispatch, rejectWithValue}) => {
  const response = await request(`/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });
  return response;
});

export const getOrderDataAction = createAsyncThunk<
  IFetchOrderResponse,
  {number: string}
>(
  'order/getOrderDataAction',
  async ({number}: {number: string}, {dispatch, rejectWithValue}) => {
    const response = await request(`/orders/${number}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  },
);
