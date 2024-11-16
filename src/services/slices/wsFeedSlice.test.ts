import { defaultWsFeedState, wsFeedReducer } from "./wsFeedSlice";

let defaultState: typeof defaultWsFeedState
beforeEach(() => {
  defaultState = defaultWsFeedState
});

test('WS FEED INITIAL STATE', () => {
  expect(wsFeedReducer(undefined, {type: 'unknown'})).toEqual(defaultState);
});
