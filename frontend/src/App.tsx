import { ChakraProvider, theme } from '@chakra-ui/react';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { Web3Provider } from './contexts/Web3Context';
import { CoingeckoProvider } from './contexts/coingecko/coingecko';
import { routes } from './routes';

export const App = () => {
  const elements = useRoutes(routes);
  return (
    <Web3Provider>
      <ChakraProvider theme={theme}>
        <CoingeckoProvider>
          <Suspense>{elements}</Suspense>
        </CoingeckoProvider>
      </ChakraProvider>
    </Web3Provider>
  );
};
