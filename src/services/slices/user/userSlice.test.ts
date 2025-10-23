import type { UserState } from './userSlice';
import reducer, {
  loginUserThunk,
  registerThunk,
  logoutThunk,
  updateThunk,
  getUserThunk
} from './userSlice';
import { TUser } from '@utils-types';

describe('userSlice works well', function () {
  const initialState: UserState = {
    isAuthChecked: false,
    isLoading: false,
    user: null,
    error: null
  };

  describe('pending tests', function () {
    it('loginUserThunk', async () => {
      const state = reducer(initialState, {
        type: loginUserThunk.pending.type
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: true
      });
    });

    it('registerThunk', async () => {
      const state = reducer(initialState, {
        type: registerThunk.pending.type
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: true
      });
    });

    it('logoutThunk', async () => {
      const state = reducer(initialState, {
        type: logoutThunk.pending.type
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: true
      });
    });

    it('updateThunk', async () => {
      const state = reducer(initialState, {
        type: updateThunk.pending.type
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: true
      });
    });

    it('getUserThunk', async () => {
      const state = reducer(initialState, {
        type: getUserThunk.pending.type
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: true
      });
    });
  });

  describe('fulfilled success tests', function () {
    it('loginUserThunk', async () => {
      const user: TUser = {
        email: 'email',
        name: 'name'
      };
      const state = reducer(initialState, {
        type: loginUserThunk.fulfilled.type,
        payload: user
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        user
      });
    });

    it('registerThunk', async () => {
      const user: TUser = {
        email: 'email',
        name: 'name'
      };
      const state = reducer(initialState, {
        type: registerThunk.fulfilled.type,
        payload: user
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        user
      });
    });

    it('logoutThunk', async () => {
      const state = reducer(initialState, {
        type: logoutThunk.fulfilled.type
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        user: null
      });
    });

    it('updateThunk', async () => {
      const user: TUser = {
        email: 'email',
        name: 'name'
      };
      const state = reducer(initialState, {
        type: updateThunk.fulfilled.type,
        payload: user
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        user
      });
    });

    it('getUserThunk', async () => {
      const user: TUser = {
        email: 'email',
        name: 'name'
      };
      const state = reducer(initialState, {
        type: getUserThunk.fulfilled.type,
        payload: user
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        user,
        isAuthChecked: true
      });
    });
  });

  describe('rejected tests', function () {
    it('loginUserThunk', async () => {
      const error = { message: 'error' };
      const state = reducer(initialState, {
        type: loginUserThunk.rejected.type,
        error
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        error
      });
    });

    it('registerThunk', async () => {
      const error = { message: 'error' };
      const state = reducer(initialState, {
        type: registerThunk.rejected.type,
        error
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        error
      });
    });

    it('logoutThunk', async () => {
      const state = reducer(initialState, {
        type: logoutThunk.rejected.type
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false
      });
    });

    it('updateThunk', async () => {
      const state = reducer(initialState, {
        type: updateThunk.rejected.type
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false
      });
    });

    it('getUserThunk', async () => {
      const error = { message: 'error' };
      const state = reducer(initialState, {
        type: getUserThunk.rejected.type,
        error
      });
      expect(state).toMatchObject({
        ...initialState,
        isLoading: false,
        error,
        isAuthChecked: true
      });
    });
  });
});
