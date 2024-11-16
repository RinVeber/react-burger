import { orderReducer, orderStateDefault } from "./orderSlice";

let defaultState: typeof orderStateDefault
beforeEach(() => {
  defaultState = orderStateDefault
});

test('ORDER INITIAL STATE', () => {
  expect(orderReducer(undefined, {type: 'unknown'})).toEqual(defaultState);
});
