import {DataDefault, IDataItem} from '../../utils/data';
import {dataReducer, dataState} from './dataSlice';
import data from '../../../cypress/fixtures/ingredients.json';
import {getAllIngredientsAction} from '../actions/actions';
import {thunk} from 'redux-thunk';
import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store';

export type AppActions =
  | {type: 'data/getAllIngredientsAction/pending'}
  | {
      type: 'data/getAllIngredientsAction/fulfilled';
      payload: {data: IDataItem[]; success: boolean};
    }
  | {type: 'data/getAllIngredientsAction/rejected'};

let defaultState: typeof dataState;
beforeEach(() => {
  defaultState = DataDefault.data;
});

test('DATA INITIAL STATE', () => {
  expect(dataReducer(undefined, {type: 'unknown'})).toEqual(defaultState);
});

const middlewares = [thunk];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const mockStore = configureMockStore<typeof dataState, AppActions>(middlewares);

describe('ASYNC ACTIONS', () => {
  let store: MockStoreEnhanced<typeof dataState, AppActions>;

  beforeEach(() => {
    store = mockStore(defaultState);
  });

  test('SHOULD DISPATCH getAllIngredientsAction', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
      }),
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    await store.dispatch(getAllIngredientsAction());

    const actions = store.getActions();
    const expectedActions = [
      expect.objectContaining({type: 'data/getAllIngredientsAction/pending'}),
      expect.objectContaining({
        type: 'data/getAllIngredientsAction/fulfilled',
        payload: expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({_id: expect.any(String)}), // Проверяем наличие _id
          ]),
          success: true,
        }),
      }),
    ];

    expect(actions).toEqual(expectedActions);

    // Проверяем обновление состояния в редюсере
    const newState = dataReducer(DataDefault.data, actions[1]);
    expect(newState.ingredients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: '643d69a5c3f7b9001cfa0949',
        }),
      ]),
    );
    expect(newState.success).toBe(true);
    expect(newState.status).toBe('success');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
