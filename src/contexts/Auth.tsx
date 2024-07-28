import { signIn } from 'api/auth.api';
import config from 'config';
import useRefresh from 'hooks/useRefresh';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer
} from 'react';

import type { FCC } from 'types/react';
import type { User } from 'types/user';
import LocalStorage from 'utils/LocalStorage';

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

interface AuthContextValue extends AuthState {
  login: Login;
  logout: VoidFunction;
}

type Login = (payload: Parameters<typeof signIn>[0]) => Promise<void>;

type Action =
  | { type: 'AUTHORIZED'; payload: { user: User } }
  | { type: 'UNAUTHORIZED' }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  isAuthenticated: Boolean(LocalStorage.get('accessToken')),
  isInitialized: false,
  user: null
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'AUTHORIZED': {
      const { user } = action.payload;
      return {
        isInitialized: true,
        isAuthenticated: true,
        user
      };
    }
    case 'UNAUTHORIZED': {
      return {
        isInitialized: true,
        isAuthenticated: false,
        user: null
      };
    }
    case 'LOGOUT': {
      return {
        isInitialized: true,
        isAuthenticated: false,
        user: null
      };
    }
    default:
      return { ...state };
  }
};

const AuthContext = createContext<AuthContextValue | null>(null);

if (config.__DEV__) {
  AuthContext.displayName = 'AuthContext';
}

const AuthProvider: FCC = (props) => {
  const { children } = props;

  const [refresh, refetch] = useRefresh();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = LocalStorage.get('user');
    const accessToken = LocalStorage.get('accessToken');

    if (user && accessToken) {
      dispatch({ type: 'AUTHORIZED', payload: { user: user } });
      // getUser()
      //   .then((response) => {
      //     const { data } = response;
      //     dispatch({ type: 'AUTHORIZED', payload: { user: data } });
      //   })
      //   .catch(() => {
      //     dispatch({ type: 'UNAUTHORIZED' });
      //   });
    } else {
      dispatch({ type: 'UNAUTHORIZED' });
    }
  }, [refresh]);

  const login: Login = useCallback(
    async (payload) => {
      const { data } = await signIn(payload);

      const { access_token, user } = data;

      LocalStorage.set('accessToken', access_token);
      LocalStorage.set('user', user);

      // dispatch({ type: 'AUTHORIZED' });
      refetch();
    },
    [refetch]
  );

  const logout = useCallback(() => {
    LocalStorage.remove('accessToken');
    LocalStorage.remove('user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const context = useMemo(
    () => ({
      ...state,
      login,
      logout
    }),
    [state, login, logout]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
