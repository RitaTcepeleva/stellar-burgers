import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '@api';

export const getOrdersThunk = createAsyncThunk<TOrder[]>(
  'orders/getOrders',
  () => getOrdersApi()
);

export const getOrderByNumberThunk = createAsyncThunk<TOrder, number>(
  'orders/getOrderByNumber',
  async (id, thunkAPI) => {
    const response = await getOrderByNumberApi(id);
    if (!response.success) {
      return thunkAPI.rejectWithValue('Ошибка при загрузке ордера');
    }
    return response.orders[0];
  }
);

export const requestOrderThunk = createAsyncThunk<
  { name: string; order: TOrder },
  string[]
>('orders/requestOrder', async (data: string[], thunkAPI) => {
  const response = await orderBurgerApi(data);
  if (!response.success) {
    return thunkAPI.rejectWithValue('Ошибка при отправки ордера');
  }
  return response;
});

export interface OrderState {
  isLoading: boolean;
  orderRequested: boolean;
  orders: TOrder[] | null;
  orderModalData: TOrder | null;
  error: SerializedError | null;
}

const initialState: OrderState = {
  isLoading: false,
  orderRequested: false,
  orders: null,
  orderModalData: null,
  error: null
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getOrdersThunk.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getOrderByNumberThunk.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.orderModalData = action.payload;
        }
      )
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(requestOrderThunk.pending, (state) => {
        state.orderRequested = true;
      })
      .addCase(
        requestOrderThunk.fulfilled,
        (state, action: PayloadAction<{ name: string; order: TOrder }>) => {
          state.orderRequested = false;
          state.orderModalData = action.payload.order;
        }
      )
      .addCase(requestOrderThunk.rejected, (state, action) => {
        state.error = action.error;
        state.orderRequested = false;
      });
  }
});

export default orderSlice.reducer;
export const { clearOrderModalData } = orderSlice.actions;
