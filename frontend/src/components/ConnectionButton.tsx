/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, useCallback, useMemo } from 'react';

import { useWeb3Auth } from '../contexts/Web3Context';
import { trimString } from '../utils/trimString';

import { WalletModal } from './modals/WalletModal';

export const ConnectionButton: FC = () => {
  const { login, logout, address } = useWeb3Auth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonLabel = useMemo(() => {
    if (address) {
      return address;
    }
    return 'Connect';
  }, [address]);

  const handleLogin = useCallback(() => {
    login();
  }, [login]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <>
      <Popover trigger="hover">
        <PopoverTrigger>
          <Button onClick={handleLogin}>{trimString(buttonLabel, 7)}</Button>
        </PopoverTrigger>
        {address && (
          <PopoverContent>
            <PopoverHeader pt={4} fontWeight="bold" border="0">
              Manage your account
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              This allows you to have an overview of your wallet and manage your
              assets.
            </PopoverBody>
            <PopoverFooter
              border="0"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={4}
            >
              <ButtonGroup size="sm">
                <Button onClick={onOpen} colorScheme="green">
                  See wallet
                </Button>
                <Button onClick={handleLogout} colorScheme="red">
                  Disconnect
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        )}
      </Popover>
      <WalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
