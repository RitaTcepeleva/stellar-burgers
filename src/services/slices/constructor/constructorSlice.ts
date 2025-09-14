import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

export interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

type ReplaceIngredientParams = {
  index: number;
  operation: 'up' | 'down';
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    chooseBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    replaceIngredient: (
      state,
      action: PayloadAction<ReplaceIngredientParams>
    ) => {
      const ingredient = state.ingredients[action.payload.index];

      if (action.payload.operation === 'up') {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index - 1];
        state.ingredients[action.payload.index - 1] = ingredient;
      } else {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index + 1];
        state.ingredients[action.payload.index + 1] = ingredient;
      }
    }
  }
});

export const { chooseBun, addIngredient, removeIngredient, replaceIngredient } =
  constructorSlice.actions;
export default constructorSlice.reducer;
