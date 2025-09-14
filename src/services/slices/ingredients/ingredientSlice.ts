import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export const getIngredientsThunk = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  () => getIngredientsApi()
);

export interface IngredientState {
  isIngredientsLoading: boolean;
  data: TIngredient[] | null;
  error: SerializedError | null;
}

const initialState: IngredientState = {
  isIngredientsLoading: false,
  data: null,
  error: null
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.data = action.payload;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error;
      });
  }
});

export default ingredientSlice.reducer;
