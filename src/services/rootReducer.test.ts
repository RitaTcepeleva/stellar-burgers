import store, { rootReducer } from './store';

describe('rootReducer initialize', () => {
  it('expect not changed initial state after unknown call', () => {
    const initialState = store.getState();

    const stateAfterUnknownCall = rootReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    expect(initialState).toEqual(stateAfterUnknownCall);
  });
});
