import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUserApi,
  TLoginData,
  getUserApi,
  registerUserApi,
  TRegisterData,
  logoutApi,
  updateUserApi
} from '../../../utils/burger-api';
import { setCookie, deleteCookie } from '../../../utils/cookie';

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async (loginData: TLoginData, thunkAPI) => {
    const response = await loginUserApi(loginData);

    if (!response.success) {
      return thunkAPI.rejectWithValue('Ошибка при логине юзера');
    }

    const { user, refreshToken, accessToken } = response;

    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return user;
  }
);

export const registerThunk = createAsyncThunk(
  'users/registerUser',
  async (registerData: TRegisterData, thunkAPI) => {
    const response = await registerUserApi(registerData);

    if (!response.success) {
      return thunkAPI.rejectWithValue('Ошибка при регистрации юзера');
    }

    const { user, refreshToken, accessToken } = response;

    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return user;
  }
);

export const logoutThunk = createAsyncThunk(
  'users/logoutUser',
  async (_, thunkAPI) => {
    const response = await logoutApi();

    if (!response.success) {
      return thunkAPI.rejectWithValue('Ошибка при регистрации юзера');
    }

    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const updateThunk = createAsyncThunk(
  'users/rupdateUser',
  async (registerData: Partial<TRegisterData>, thunkAPI) => {
    const response = await updateUserApi(registerData);

    if (!response.success) {
      return thunkAPI.rejectWithValue('Ошибка при регистрации юзера');
    }

    return response.user;
  }
);

export const getUserThunk = createAsyncThunk<TUser>(
  'users/getUser',
  async (_, thunkAPI) => {
    const response = await getUserApi();
    if (!response.success) {
      return thunkAPI.rejectWithValue('Ошибка при загрузке юзера');
    }

    return response.user;
  }
);

export interface UserState {
  isAuthChecked: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: SerializedError | null;
}

const initialState: UserState = {
  isAuthChecked: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUserThunk.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.isLoading = false;
          state.isAuthChecked = true;
        }
      )
      .addCase(getUserThunk.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUserThunk.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerThunk.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateThunk.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateThunk.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default userSlice.reducer;
