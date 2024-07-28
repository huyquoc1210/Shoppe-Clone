import ExtendPurchasesContext from 'contexts/ExtendedPurchases';
import { useContext } from 'react';

const useExtendPurchases = () => {
  const context = useContext(ExtendPurchasesContext);

  if (!context) {
    throw new Error('ExtendPurchases context must be used within a Provider');
  }

  return context;
};

export default useExtendPurchases;
