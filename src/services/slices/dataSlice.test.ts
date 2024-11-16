import {DataDefault} from '../../utils/data';
import {dataReducer, dataSlice, dataState} from './dataSlice';

let defaultState: typeof dataState
beforeEach(() => {
  defaultState = DataDefault.data;
});

test('SERVER INITIAL STATE', () => {
  expect(dataReducer(undefined, {type: 'unknown'})).toEqual(defaultState);
});
