import {
  Box,
  Button,
  ButtonGroup, // Container,
  Flex,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC } from 'react';
import { FiMenu } from 'react-icons/fi';

import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { ConnectionButton } from '../../ConnectionButton';

export const TopBar: FC = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box as="section" pb={{ base: '12', md: '24' }}>
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
      >
        <HStack
          spacing="10"
          justify="space-between"
          py={{ base: '4', lg: '5' }}
          px={{ base: '4', md: '8', lg: '12' }}
        >
          <Text>AppName™</Text>
          {isDesktop ? (
            <Flex justify="space-between" flex="1">
              <ButtonGroup variant="link" spacing="8">
                {['Product', 'Pricing', 'Resources', 'Support'].map(item => (
                  <Button key={item}>{item}</Button>
                ))}
              </ButtonGroup>
              <HStack spacing="3">
                <ColorModeSwitcher justifySelf="flex-end" />
                <ConnectionButton />
              </HStack>
            </Flex>
          ) : (
            <IconButton
              variant="ghost"
              icon={<FiMenu fontSize="1.25rem" />}
              aria-label="Open Menu"
            />
          )}
        </HStack>
      </Box>
    </Box>
  );
};
