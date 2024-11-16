import {authReducer, defaultAuthState, setUserAction} from './authSlice';
import user from '../../../cypress/fixtures/login_success.json';

let defaultState: typeof defaultAuthState;
beforeEach(() => {
  defaultState = defaultAuthState;
});

test('AUTH INITIAL STATE', () => {
  expect(authReducer(undefined, {type: 'unknown'})).toEqual(defaultState);
});

test('SET USER ACTION', () => {
  const action = setUserAction(user);
  const expectedState = {
    ...defaultAuthState,
    userInfo: user.user,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    success: user.success,
    isLoginSuccess: true,
    userInfoSuccess: true,
  };

  expect(authReducer(defaultState, action)).toEqual(expectedState);
});
