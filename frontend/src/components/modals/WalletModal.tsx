import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';

import { useWeb3Auth } from '../../contexts/Web3Context';
import { WalletTable } from '../tables/WalletTable';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { balances } = useWeb3Auth();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{'Welcome to your wallet'}</ModalHeader>
        <ModalBody>
          <WalletTable balances={balances} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            {'Close'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
