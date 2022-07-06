import { Provider } from '../context'
import '../styles/globals.css'
import { ReactQueryDevtools } from "react-query/devtools";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";



function MyApp({ Component, pageProps }) {  
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider>
          <Component {...pageProps} />
          </Provider>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
