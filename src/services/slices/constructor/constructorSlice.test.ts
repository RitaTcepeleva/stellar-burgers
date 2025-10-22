jest.mock('@reduxjs/toolkit', () => {
  const actual = jest.requireActual('@reduxjs/toolkit');
  return {
    ...actual,
    nanoid: () => 'testid'
  };
});

import reducer, {
  addIngredient,
  removeIngredient,
  replaceIngredient
} from './constructorSlice';

import type { ConstructorState } from './constructorSlice';

describe('constructorSlice works well', function () {
  const initialState: ConstructorState = {
    bun: null,
    ingredients: [
      {
        id: '0',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '1',
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      }
    ]
  };

  it('add ingredient', function () {
    const ingredientToAdd = {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    };

    const newState = reducer(initialState, addIngredient(ingredientToAdd));
    expect(newState.ingredients.length).toBe(3);
    expect(newState.ingredients[0]).toMatchObject(initialState.ingredients[0]);
    expect(newState.ingredients[1]).toMatchObject(initialState.ingredients[1]);
    expect(newState.ingredients[2]).toMatchObject(ingredientToAdd);
    expect(newState.ingredients[2].id).toEqual('testid');
  });

  it('remove ingredient', function () {
    const newState = reducer(initialState, removeIngredient('0'));

    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0]).toMatchObject(initialState.ingredients[1]);
  });

  it('move ingredient up', function () {
    const newState = reducer(
      initialState,
      replaceIngredient({ index: 1, operation: 'up' })
    );

    expect(newState.ingredients.length).toBe(2);
    expect(newState.ingredients[0]).toMatchObject(initialState.ingredients[1]);
    expect(newState.ingredients[1]).toMatchObject(initialState.ingredients[0]);
  });

  it('move ingredient down', function () {
    const newState = reducer(
      initialState,
      replaceIngredient({ index: 0, operation: 'down' })
    );

    expect(newState.ingredients.length).toBe(2);
    expect(newState.ingredients[0]).toMatchObject(initialState.ingredients[1]);
    expect(newState.ingredients[1]).toMatchObject(initialState.ingredients[0]);
  });
});
