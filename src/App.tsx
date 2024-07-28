import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import config from 'config';
import { AuthProvider } from 'contexts/Auth';
import { ExtendPurchasesProvider } from 'contexts/ExtendedPurchases';
import ErrorBoundary from 'pages/error/ErrorBoundary';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  useEffect(() => {
    console.log(`Shoppe (version: ${config.VERSION}) - Copyright © 2023 by QH`);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ExtendPurchasesProvider>
            <ErrorBoundary>
              <Router />
            </ErrorBoundary>
            <ToastContainer />
          </ExtendPurchasesProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
