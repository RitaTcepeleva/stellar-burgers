import type { IngredientState } from './ingredientSlice';
import reducer, { getIngredientsThunk } from './ingredientSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice works well', function () {
  const initialState: IngredientState = {
    isIngredientsLoading: false,
    data: null,
    error: null
  };

  it('getIngredientsThunk.pending test', async () => {
    const state = reducer(initialState, {
      type: getIngredientsThunk.pending.type
    });
    expect(state).toMatchObject({
      ...initialState,
      isIngredientsLoading: true,
      error: null
    });
  });

  it('getIngredientsThunk.fulfilled success test', async () => {
    const data: TIngredient[] = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ];
    const state = reducer(initialState, {
      type: getIngredientsThunk.fulfilled.type,
      payload: data
    });
    expect(state).toMatchObject({
      ...initialState,
      isIngredientsLoading: false,
      data
    });
  });

  it('getIngredientsThunk.rejected test', async () => {
    const error = { message: 'error' };
    const state = reducer(initialState, {
      type: getIngredientsThunk.rejected.type,
      error
    });
    expect(state).toMatchObject({
      ...initialState,
      isIngredientsLoading: false,
      error
    });
  });
});
