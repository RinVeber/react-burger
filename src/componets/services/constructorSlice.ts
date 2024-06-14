import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { BASE_URL, IDataItem } from "../../utils/data";

interface Order {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

interface State {
  selectedBun: any;
  selectedIngredients: IDataItem[];
  orderNumber: string | number | null;
  orderDetails: Order | null;
  success: boolean;
  errorMessage: string | null;
  status: "init" | "loading" | "success" | "error";
}

const constructorState: State = {
  selectedBun: null,
  selectedIngredients: [],
  orderNumber: null,
  orderDetails: null,
  success: false,
  errorMessage: null,
  status: "init",
};

export const sendOrderAction = createAsyncThunk(
  "constructor/sendOrderAction",
  async (data: string[], { dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: data }),
      });
      return response.json();
    } catch (e) {
      console.log(e);
    }
  }
);

export const constructorSlice = createSlice({
  name: "constructor",
  initialState: constructorState,
  reducers: {
    addIngredientAction: (state, action) => {
      if (action.payload.type === "bun") {
        state.selectedBun = action.payload;
      } else {
        state.selectedIngredients = [
          action.payload,
          ...state.selectedIngredients,
        ];
      }
    },

    removeIngredientAction: (state, action) => {
      const indexToRemove = state.selectedIngredients.findIndex(
        (item) => item._id === action.payload._id
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
      const newArray = componentsArray;
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
} = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
