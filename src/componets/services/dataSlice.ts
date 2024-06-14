import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { BASE_URL, IDataItem } from "../../utils/data";
import { TabStatus } from "../burger-ingredients/burger-ingredients";

interface State {
  ingredients: IDataItem[];
  success: boolean;
  errorMessage: string | null;
  ingredientsCurrentTab: TabStatus;
  status: "init" | "loading" | "success" | "error";
  selectedIngredient: IDataItem | null;
}

const dataState: State = {
  ingredients: [],
  success: false,
  errorMessage: null,
  ingredientsCurrentTab: TabStatus.buns,
  selectedIngredient: null,
  status: "init",
};

export const getAllIngredientsAction = createAsyncThunk(
  "data/getAllIngredientsAction",
  async (_, { dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/ingredients/`, {
        method: "GET",
      });
      if (response.ok) {
        return response.json();
      } else {
        dispatch(loadDataFailAction(response.json()));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: dataState,
  reducers: {
    loadDataFailAction: (state, action) => {
      state.errorMessage = action.payload;
      state.success = action.payload.success;
      state.ingredients = [];
    },

    toggleIngredientsTabAction: (state, action) => {
      state.ingredientsCurrentTab = action.payload;
    },
    getCurrentIngredientAction: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    removeCurrentIngredientAction: (state) => {
      state.selectedIngredient = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder
      .addCase(getAllIngredientsAction.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.success = true;
        state.status = "success";
      })
      .addCase(getAllIngredientsAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllIngredientsAction.rejected, (state, action) => {
        state.success = false;
        state.status = "error";
      });
  },
});

export const {
  loadDataFailAction,
  toggleIngredientsTabAction,
  getCurrentIngredientAction,
  removeCurrentIngredientAction,
} = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
