import { Spacer, VStack } from '@shared/ui-kit';
import { useNavRoutes } from '../hooks/useNavRoutes';
import { NavItem } from './DesktopNavItem';

// TODO: SidebarMenu와 TabBar의 로직 유사하므로 통합 필요
export const DesktopNavMenu = () => {
  const { NAV_ROUTES } = useNavRoutes();

  return (
    <VStack as="ul" w="100%" h="100%" spacing="2rem">
      <NavItem route={NAV_ROUTES.HOME} />
      <NavItem route={NAV_ROUTES.PROFILE} />
      <NavItem route={NAV_ROUTES.LEADERBOARD} />
      <NavItem route={NAV_ROUTES.EVALLOG} />
      <NavItem route={NAV_ROUTES.CALCULATOR} />
      <Spacer />
      <NavItem route={NAV_ROUTES.SETTING} />
    </VStack>
  );
};
