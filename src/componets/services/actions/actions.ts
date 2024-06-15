import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadDataFailAction } from "../slices/dataSlice";
import { loadOrderFailAction } from "../slices/constructorSlice";
import { request } from "../../../utils/helper-function/checkResponse";

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
  async (_, { dispatch }) => {
    const response = await request(`/ingredients`, {
      method: "GET",
    });

    if (response.success) {
      return response;
    } else {
      dispatch(loadOrderFailAction(loadDataFailAction));
    }
  }
);
