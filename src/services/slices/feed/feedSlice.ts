import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';
import { PayloadAction } from '@reduxjs/toolkit';

export const getFeedThunk = createAsyncThunk<TOrdersData>(
  'feeds/getFeeds',
  () => getFeedsApi()
);

export interface FeedState {
  isLoading: boolean;
  data: TOrdersData | null;
  error: SerializedError | null;
}

const initialState: FeedState = {
  isLoading: false,
  data: null,
  error: null
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getFeedThunk.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(getFeedThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default feedSlice.reducer;
