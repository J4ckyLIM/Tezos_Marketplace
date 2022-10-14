import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const Footer: FC = () => (
  <Box as="section">
    <Box as="footer" bg="bg-surface">
      <Stack
        spacing="8"
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        py={{ base: '12', md: '16' }}
        px={{ base: '4', md: '8', lg: '12' }}
      >
        <Stack spacing={{ base: '6', md: '8' }} align="start">
          <Text>AppName™</Text>
          <Text color="muted">Finance our app please.</Text>
        </Stack>
        <Stack
          direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
          spacing={{ base: '12', md: '8' }}
        >
          <Stack direction="row" spacing="8">
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Product
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link">How it works</Button>
                <Button variant="link">Pricing</Button>
                <Button variant="link">Use Cases</Button>
              </Stack>
            </Stack>
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Legal
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link">Privacy</Button>
                <Button variant="link">Terms</Button>
                <Button variant="link">License</Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing="4">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Stay up to date
            </Text>
            <Stack
              spacing="4"
              direction={{ base: 'column', sm: 'row' }}
              maxW={{ lg: '360px' }}
            >
              <Input placeholder="Enter your email" type="email" required />
              <Button type="submit" colorScheme="yellow" flexShrink={0}>
                Subscribe
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        pt="8"
        pb="12"
        justify="space-between"
        direction={{ base: 'column-reverse', md: 'row' }}
        align="center"
        px={{ base: '4', md: '8', lg: '12' }}
      >
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} AppName™, Inc. All rights reserved.
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
    </Box>
  </Box>
);
