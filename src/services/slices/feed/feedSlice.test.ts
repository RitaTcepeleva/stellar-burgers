import type { FeedState } from './feedSlice';
import reducer, { getFeedThunk } from './feedSlice';
import { TOrdersData } from '@utils-types';

describe('feedSlice works well', function () {
  const initialState: FeedState = {
    isLoading: false,
    data: null,
    error: null
  };

  it('getFeedThunk.pending test', async () => {
    const state = reducer(initialState, { type: getFeedThunk.pending.type });
    expect(state).toMatchObject({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('getFeedThunk.fulfilled success test', async () => {
    const data: TOrdersData = {
      orders: [
        {
          _id: '68f9f1f074993f001b5baa1d',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2025-10-23T09:14:24.342Z',
          updatedAt: '2025-10-23T09:14:25.429Z',
          number: 91885
        }
      ],
      total: 1,
      totalToday: 1
    };
    const state = reducer(initialState, {
      type: getFeedThunk.fulfilled.type,
      payload: data
    });
    expect(state).toMatchObject({
      ...initialState,
      isLoading: false,
      data
    });
  });

  it('getFeedThunk.rejected test', async () => {
    const error = { message: 'error' };
    const state = reducer(initialState, {
      type: getFeedThunk.rejected.type,
      error
    });
    expect(state).toMatchObject({
      ...initialState,
      isLoading: false,
      error
    });
  });
});
