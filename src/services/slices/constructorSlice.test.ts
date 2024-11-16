import { addIngredientAction, constructorReducer, defaultConstructorState } from "./constructorSlice";
import bun from '../../../cypress/fixtures/bun.json';

let defaultState: typeof defaultConstructorState
beforeEach(() => {
  defaultState = defaultConstructorState
});

test('CONSTRUCTOR INITIAL STATE', () => {
  expect(constructorReducer(undefined, {type: 'unknown'})).toEqual(defaultState);
});


test('ADD INGREDIENT ACTION - BUN', () => {
    const action = addIngredientAction(bun);
    
    const expectedState = {
      ...defaultState,
      selectedBun: {
        ...bun,
        uniqueId: action.payload.uniqueId,
      },
    };
  
    expect(constructorReducer(defaultState, action)).toEqual(expectedState);
  });

  test('ADD INGREDIENT ACTION - REGULAR INGREDIENT', () => {
    const regularIngredient = { ...bun, type: 'ingredient' };
    const action = addIngredientAction(regularIngredient);
  
    const expectedState = {
      ...defaultState,
      selectedIngredients: [
        {
          ...regularIngredient,
          uniqueId: action.payload.uniqueId,
        },
      ],
    };
  
    expect(constructorReducer(defaultState, action)).toEqual(expectedState);
  });