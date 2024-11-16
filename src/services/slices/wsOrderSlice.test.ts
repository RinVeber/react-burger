import { defaultWsOrderState, wsOrderReducer } from "./wsOrderSlice";


let defaultState: typeof defaultWsOrderState
beforeEach(() => {
  defaultState =  defaultWsOrderState
});

test('WS ORDER INITIAL STATE', () => {
  expect(wsOrderReducer(undefined, {type: 'unknown'})).toEqual(defaultState);
});
