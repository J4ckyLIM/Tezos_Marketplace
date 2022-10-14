/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/no-empty-function */
import { SafeEventEmitterProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/web3auth';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Balance,
  ContractAddressesMapping,
  TickerInfoMap,
} from '../constants/contracts';
import { DEFAULT_NETWORK, Network, NetworkConfig } from '../constants/web3';

import { RPC } from './ethersRPC';

interface Web3Config {
  web3auth: Web3Auth | null;
  provider: SafeEventEmitterProvider | null;
  network: Network;
  address: string | null;
  chainId: number | null;
  balance: string | null;
  balances: Balance[] | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<any>; // To be defined
  switchNetwork: (network: Network) => Promise<void>;
  sendTransaction: () => Promise<unknown | undefined>;
  signMessage: () => Promise<string | undefined>;
  getPrivateKey: () => Promise<string | undefined>;
}

const Web3Context = createContext<Web3Config>({
  network: DEFAULT_NETWORK,
  provider: null,
  web3auth: null,
  address: null,
  chainId: null,
  balance: null,
  balances: null,
  login: async () => {},
  logout: async () => {},
  getUserInfo: async () => {},
  switchNetwork: async () => {},
  sendTransaction: async () => [],
  signMessage: async () => 'hello',
  getPrivateKey: async () => 'hello',
});

export const Web3Provider = ({ children }: { children: any }) => {
  const [network, setNetwork] = useState<Network>(DEFAULT_NETWORK);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null,
  );
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [balances, setBalances] = useState<Balance[] | null>(null);
  const [contractAddresses, setContractAddresses] =
    useState<TickerInfoMap | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId: process.env.REACT_APP_WEB3_AUTH_CLIENT_ID || '',
          chainConfig: NetworkConfig[network] as any,
        });
        setWeb3auth(web3authInstance);

        await web3authInstance.initModal();
        if (web3authInstance.provider) {
          setProvider(web3authInstance.provider);
        }
        setContractAddresses(ContractAddressesMapping[network]);
      } catch (error) {
        console.error(error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    init();
  }, [network]);

  const login = useCallback(async () => {
    if (!web3auth) {
      console.error('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  }, [web3auth]);

  const logout = useCallback(async () => {
    if (!web3auth) {
      console.error('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
  }, [web3auth]);

  const getUserInfo = useCallback(async () => {
    if (!web3auth) {
      console.error('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
    return user;
  }, [web3auth]);

  const switchNetwork = useCallback(async (net: Network) => {
    setNetwork(net);
  }, []);

  const getChainId = useCallback(async () => {
    if (!provider) {
      console.error('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.getChainId();
    return result;
  }, [provider]);

  const getAccounts = useCallback(async () => {
    if (!provider) {
      console.error('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.getAccounts();
    return result;
  }, [provider]);

  const getBalance = useCallback(async () => {
    if (!provider) {
      console.error('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.getBalance();
    return result;
  }, [provider]);

  const getBalanceOf = useCallback(
    async (contractAddress: string) => {
      if (!provider) {
        console.error('provider not initialized yet');
        return;
      }
      if (!address) {
        console.error('address not found');
        return;
      }
      const rpc = new RPC(provider);
      const result = await rpc.getBalanceOf(contractAddress, address);
      return result;
    },
    [provider, address],
  );

  const sendTransaction = useCallback(async () => {
    if (!provider) {
      console.error('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    return receipt;
  }, [provider]);

  const signMessage = useCallback(async () => {
    if (!provider) {
      console.error('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    return signedMessage;
  }, [provider]);

  const getPrivateKey = useCallback(async () => {
    if (!provider) {
      console.error('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    return privateKey;
  }, [provider]);

  useEffect(() => {
    const fetchData = async () => {
      const addressResult = await getAccounts();
      setAddress(addressResult);

      const chainIdResult = await getChainId();
      setChainId(chainIdResult);

      const balanceResult = await getBalance();
      setBalance(balanceResult ?? null);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, [getAccounts, getChainId, getBalance]);

  useEffect(() => {
    const fetchBalances = async () => {
      if (address && contractAddresses) {
        const balancesResult = await Promise.all(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Object.entries(contractAddresses).map(async ([_, value]) => {
            const balanceResult = await getBalanceOf(value.address);
            return {
              ...ContractAddressesMapping[network][value.ticker],
              balance: balanceResult,
            };
          }),
        );
        setBalances(balancesResult);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchBalances();
  }, [address, contractAddresses, getBalanceOf, network]);

  const contextValues = useMemo(() => {
    return {
      network,
      provider,
      web3auth,
      address,
      chainId,
      balance,
      balances,
      login,
      logout,
      getUserInfo,
      switchNetwork,
      sendTransaction,
      signMessage,
      getPrivateKey,
    };
  }, [
    network,
    provider,
    web3auth,
    address,
    chainId,
    balance,
    balances,
    login,
    logout,
    getUserInfo,
    switchNetwork,
    sendTransaction,
    signMessage,
    getPrivateKey,
  ]);

  return (
    <Web3Context.Provider value={contextValues}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Auth = () => {
  const {
    web3auth,
    provider,
    network,
    address,
    chainId,
    balance,
    balances,
    login,
    logout,
    getUserInfo,
    sendTransaction,
    signMessage,
    getPrivateKey,
  } = useContext(Web3Context);
  return {
    web3auth,
    provider,
    network,
    address,
    chainId,
    balance,
    balances,
    login,
    logout,
    getUserInfo,
    sendTransaction,
    signMessage,
    getPrivateKey,
  };
};
