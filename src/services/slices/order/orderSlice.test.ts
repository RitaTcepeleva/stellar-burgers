import type { OrderState } from './orderSlice';
import reducer, {
  getOrdersThunk,
  getOrderByNumberThunk,
  requestOrderThunk
} from './orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice works well', function () {
  const initialState: OrderState = {
    isLoading: false,
    orderRequested: false,
    orders: null,
    orderModalData: null,
    error: null
  };

  describe('pending tests', function () {
    it('getOrdersThunk', async () => {
      const state = reducer(initialState, {
        type: getOrdersThunk.pending.type
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    it('getOrderByNumberThunk', async () => {
      const state = reducer(initialState, {
        type: getOrderByNumberThunk.pending.type
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    it('requestOrderThunk', async () => {
      const state = reducer(initialState, {
        type: requestOrderThunk.pending.type
      });
      expect(state).toMatchObject({
        ...initialState,
        orderRequested: true
      });
    });
  });

  describe('fulfilled success tests', function () {
    it('getOrdersThunk', async () => {
      const orders: TOrder[] = [
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
      ];
      const state = reducer(initialState, {
        type: getOrdersThunk.fulfilled.type,
        payload: orders
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        orders
      });
    });

    it('getOrderByNumberThunk', async () => {
      const order: TOrder = {
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
      };
      const state = reducer(initialState, {
        type: getOrderByNumberThunk.fulfilled.type,
        payload: order
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        orderModalData: order
      });
    });

    it('requestOrderThunk', async () => {
      const order = {
        name: 'name',
        order: {
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
      };
      const state = reducer(initialState, {
        type: requestOrderThunk.fulfilled.type,
        payload: order
      });
      expect(state).toMatchObject({
        ...initialState,
        orderRequested: false,
        orderModalData: order.order
      });
    });
  });

  describe('rejected tests', function () {
    it('getOrdersThunk', async () => {
      const error = { message: 'error' };
      const state = reducer(initialState, {
        type: getOrdersThunk.rejected.type,
        error
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        error
      });
    });

    it('getOrderByNumberThunk', async () => {
      const error = { message: 'error' };
      const state = reducer(initialState, {
        type: getOrderByNumberThunk.rejected.type,
        error
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        error
      });
    });

    it('requestOrderThunk', async () => {
      const error = { message: 'error' };
      const state = reducer(initialState, {
        type: requestOrderThunk.rejected.type,
        error
      });
      expect(state).toMatchObject({
        ...initialState,
        orderRequested: false,
        error
      });
    });
  });
});
