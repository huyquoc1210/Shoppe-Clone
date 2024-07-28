import config from 'config';
import { createContext, useMemo, useState } from 'react';
import type { ExtendedPurchase } from 'types/purchase';
import type { DispatchAction, FCC } from 'types/react';

interface ExtendPurchasesContextState {
  extendPurchases: ExtendedPurchase[];
  setExtendPurchases: DispatchAction<ExtendedPurchase[]>;
}

const initialState: ExtendPurchasesContextState = {
  extendPurchases: [],
  setExtendPurchases: () => null
};

const ExtendPurchasesContext = createContext<ExtendPurchasesContextState | null>(null);

if (config.__DEV__) {
  ExtendPurchasesContext.displayName = 'ExtendPurchasesContext';
}

const ExtendPurchasesProvider: FCC = (props) => {
  const { children } = props;
  const [extendPurchases, setExtendPurchases] = useState<ExtendedPurchase[]>(
    initialState.extendPurchases
  );

  const context = useMemo(
    () => ({ extendPurchases, setExtendPurchases }),
    [extendPurchases, setExtendPurchases]
  );

  return (
    <ExtendPurchasesContext.Provider value={context}>{children}</ExtendPurchasesContext.Provider>
  );
};

export { ExtendPurchasesProvider };
export default ExtendPurchasesContext;
