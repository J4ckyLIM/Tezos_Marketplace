import { VStack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../Footer/Footer';
import { TopBar } from '../TopBar/TopBar';

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = () => {
  return (
    <VStack align="stretch">
      <TopBar />
      <Outlet />
      <Footer />
    </VStack>
  );
};
