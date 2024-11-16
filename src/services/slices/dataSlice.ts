import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {IDataItem} from '../../utils/data';
import {TabStatus} from '../../componets/burger-ingredients/burger-ingredients';
import {getAllIngredientsAction} from '../actions/actions';

export interface State {
  ingredients: IDataItem[];
  success: boolean;
  errorMessage: unknown;
  ingredientsCurrentTab: string;
  isModal: boolean;
  status: 'init' | 'loading' | 'success' | 'error';
  selectedIngredient: IDataItem | null;
}

export const dataState: State = {
  ingredients: [],
  isModal: false,
  success: false,
  errorMessage: null,
  ingredientsCurrentTab: "bun",
  selectedIngredient: null,
  status: 'init',
};

export const dataSlice = createSlice({
  name: 'data',
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
      state.selectedIngredient = action.payload.selectedIngredient;
      state.isModal = action.payload.isModal;
    },
    changeIsModalAction: (state, action) => {
      state.isModal = action.payload.isModal;
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
        state.status = 'success';
      })
      .addCase(getAllIngredientsAction.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getAllIngredientsAction.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.success = false;
        state.status = 'error';
      });
  },
});

export const {
  loadDataFailAction,
  toggleIngredientsTabAction,
  getCurrentIngredientAction,
  removeCurrentIngredientAction,
  changeIsModalAction
} = dataSlice.actions;


export const dataReducer = dataSlice.reducer;
