import {
  Avatar,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FC } from 'react';

import { Balance } from '../../constants/contracts';
import { formatNumber } from '../../utils/formatNumber';

interface WalletTableProps {
  balances: Balance[] | null;
}

export const WalletTable: FC<WalletTableProps> = ({ balances }) => {
  if (!balances) {
    return null;
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Powered by AppName™</TableCaption>
        <Thead>
          <Tr>
            <Th>Token</Th>
            <Th isNumeric>Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {balances.map(balance => (
            <Tr key={balance.tickerName}>
              <Td>
                <Avatar size="xs" src={balance.logoURL} /> {balance.tickerName}
              </Td>
              <Td isNumeric>
                {formatNumber(balance.balance)} {balance.ticker}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
