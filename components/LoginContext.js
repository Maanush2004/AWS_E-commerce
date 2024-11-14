import { createContext, useState } from "react";

export const LoginContext = createContext({});

export function LoginContextProvider({ children }) {
  const [Login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ Login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
}