import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';

import { isSpotlightOpenAtom } from '@core/atoms/isSpotlightOpenAtom';
import { TabletNavDrawer } from '@core/components/NavBar/Tablet/TabletNavDrawer';
import { TabletNavMenu } from '@core/components/NavBar/Tablet/TabletNavMenu';
import { TabletNavProfile } from '@core/components/NavProfile/Tablet';
import { ReactComponent as MdSearch } from '@shared/assets/icon/md-search.svg';
import { userAtom } from '@shared/atoms/userAtom';
import { ARIA_LABEL } from '@shared/constants/accessibility';
import { Center, Clickable, VStack } from '@shared/ui-kit';

export const TabletNavBar = () => {
  const theme = useTheme();
  const user = useAtomValue(userAtom);
  const setIsSpotlightOpen = useSetAtom(isSpotlightOpenAtom);

  const openSpotlight = () => {
    setIsSpotlightOpen(true);
  };

  return (
    <Layout>
      <VStack w="100%" h="100%" spacing="4rem">
        <TabletNavDrawer />
        <Center h="12rem">
          <TabletNavProfile imgUrl={user.imgUrl} />
        </Center>
        <Clickable
          onClick={openSpotlight}
          aria-label={ARIA_LABEL.BUTTON.SEARCH_USER_OR_PROJECT_USING_SPOTLIGHT}
        >
          <MdSearch width={20} height={20} fill={theme.colors.mono.black} />
        </Clickable>
        <TabletNavMenu />
      </VStack>
    </Layout>
  );
};

const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 7rem;
  height: 100%;
  padding: 3rem 0;
  user-select: none;
`;
