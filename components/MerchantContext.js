import { createContext, useState } from "react";

export const MerchantContext = createContext({});

export function MerchantContextProvider({ children }) {
  const [merchant, setMerchant] = useState(false);

  return (
    <MerchantContext.Provider value={{ merchant, setMerchant }}>
      {children}
    </MerchantContext.Provider>
  );
}