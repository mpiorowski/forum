import "../styles/globals.scss";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "../config/storeConfig";
import { Provider as ReduxProvider } from "react-redux";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default MyApp;
