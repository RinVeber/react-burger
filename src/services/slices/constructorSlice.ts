import {
  ActionReducerMapBuilder,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IDataItem } from "../../utils/data";
import { sendOrderAction } from "../actions/actions";

interface Order {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

interface State {
  selectedBun: IDataItem | null;
  selectedIngredients: IDataItem[];
  orderNumber: string | number | null;
  orderDetails: Order | null;
  success: boolean;
  errorMessage: unknown;
  status: "init" | "loading" | "success" | "error";
}

export const defaultConstructorState: State = {
  selectedBun: null,
  selectedIngredients: [],
  orderNumber: null,
  orderDetails: null,
  success: false,
  errorMessage: null,
  status: "init",
};

export const constructorSlice = createSlice({
  name: "constructor",
  initialState: defaultConstructorState,
  reducers: {
    loadOrderFailAction: (state, action) => {
      state.errorMessage = action.payload;
      state.success = action.payload.success;
      state.orderDetails = null;
    },
    addIngredientAction: {
      reducer: (state, action: PayloadAction<IDataItem>) => {
        if (action.payload.type === "bun") {
          state.selectedBun = action.payload;
        } else {
          state.selectedIngredients = [
            action.payload,
            ...state.selectedIngredients,
          ];
        }
      },
      prepare: (ingredient: IDataItem) => {
        return { payload: { ...ingredient, uniqueId: nanoid() } };
      },
    },

    removeIngredientAction: (state, action) => {
      const indexToRemove = state.selectedIngredients.findIndex(
        (item) => item._id === action.payload._id,
      );
      if (indexToRemove !== -1) {
        state.selectedIngredients.splice(indexToRemove, 1);
      }
    },
    clearConstructorAction: (state) => {
      state.selectedIngredients = [];
      state.selectedBun = null;
      state.orderDetails = null;
    },

    sortIngredientsAction: (state, action) => {
      const { dragIndex, hoverIndex, componentsArray } = action.payload;
      const newArray = [...componentsArray]
      const dragItem = componentsArray[dragIndex];
      const hoverItem = componentsArray[hoverIndex];
      newArray[dragIndex] = hoverItem;
      newArray[hoverIndex] = dragItem;

      state.selectedIngredients = newArray;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder
      .addCase(sendOrderAction.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.number;
        state.orderDetails = action.payload;
        state.success = true;
        state.status = "success";
      })
      .addCase(sendOrderAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendOrderAction.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.orderDetails = null;
        state.success = false;
        state.status = "error";
      });
  },
});

export const {
  addIngredientAction,
  removeIngredientAction,
  clearConstructorAction,
  sortIngredientsAction,
  loadOrderFailAction,
} = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
