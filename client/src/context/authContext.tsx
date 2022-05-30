import { createContext, ReactElement, useState } from 'react';

export type AuthType = {
  email: string;
  name: string;
  access_token: string;
  refresh_token: string;
};
export type AuthContextType = {
  logged: boolean;
  auth: AuthType;
  login: (auth: AuthType) => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [logged, setLoger] = useState(false);
  const [auth, setAuth] = useState<AuthType>({
    email: '',
    name: '',
    access_token: '',
    refresh_token: '',
  });

  const login = (auth: AuthType) => {
    setLoger(true);
    console.log('auth', auth);
    setAuth(auth);
  };

  return (
    <AuthContext.Provider value={{ logged, auth, login }}>
      {children}
    </AuthContext.Provider>
  );
};
