import React, { useContext, useEffect, useState } from 'react';

import axios from '../../utils/axios';

export const COINGECKO_POOL_INTERVAL = 1000 * 60; // 60 sec
export const COINGECKO_API = 'https://api.coingecko.com/api/v3/';
export const COINGECKO_COIN_PRICE_API = `${COINGECKO_API}simple/price`;

export interface CoingeckoContextState {
  ethPrice: number;
}

export const ethToUSD = async (): Promise<number> => {
  const url = `${COINGECKO_COIN_PRICE_API}?ids=ethereum&vs_currencies=usd`;
  const result = await axios.get(url).then(res => res.data);
  return result.ethereum.usd;
};

/**
 * Returns the price of a token in USD from coingecko API
 * @param cgTokenName Coingecko token name
 * @returns Promise of the price in USD
 */
export const altToUSD = async (cgTokenName?: string): Promise<number> => {
  const cgTokenId = cgTokenName
    ? cgTokenName.toLowerCase().split(' ').join('-')
    : '';
  const url = `${COINGECKO_COIN_PRICE_API}?ids=${cgTokenId}&vs_currencies=usd`;
  const resp = await axios.get(url).then(async res => res.data);
  return resp[cgTokenId]?.usd;
};

const CoingeckoContext = React.createContext<CoingeckoContextState | null>(
  null,
);

export function CoingeckoProvider({ children = null as any }) {
  const [ethPrice, setEthPrice] = useState<number>(0);

  useEffect(() => {
    let timerId = 0;
    const queryPrice = async () => {
      const eth = await ethToUSD();
      setEthPrice(eth);

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      startTimer();
    };

    const startTimer = () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      timerId = window.setTimeout(async () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queryPrice();
      }, COINGECKO_POOL_INTERVAL);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    queryPrice();
    return () => {
      clearTimeout(timerId);
    };
  }, [setEthPrice]);

  return (
    <CoingeckoContext.Provider value={{ ethPrice }}>
      {children}
    </CoingeckoContext.Provider>
  );
}

export const useCoingecko = () => {
  const context = useContext(CoingeckoContext);
  return context as CoingeckoContextState;
};
