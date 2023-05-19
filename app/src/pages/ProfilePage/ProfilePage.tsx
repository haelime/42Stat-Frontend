import { DeferredComponent, Text, VStack } from '@/components/common';
import { Tab, TabList, TabPanel, Tabs } from '@/components/common/Tab';
import { Dashboard } from '@/components/templates/Dashboard';
import { ProfileEvalTabSkeleton } from '@/pages/PageSkeletons/ProfileEvalTabSkeleton';
import { ProfileGeneralTab } from '@/pages/ProfileGeneralTab';
import styled from '@emotion/styled';
import { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useProfilePageDashboard } from './hooks';

const ProfileEvalTab = lazy(() =>
  import('@/pages/ProfileEvalTab').then((module) => ({
    default: module.ProfileEvalTab,
  })),
);

export const ProfilePage = () => {
  const { username } = useParams();

  return (
    <>
      <Helmet>
        <title>{username} | 42Stat</title>
      </Helmet>
      <ProfilePageLayout>
        <VStack w="100%" spacing="2rem">
          <Dashboard {...useProfilePageDashboard()} />
          <Tabs>
            <TabList>
              <Tab>
                <Text>일반</Text>
              </Tab>
              <Tab>
                <Text>평가</Text>
              </Tab>
            </TabList>
            <TabPanel>
              <ProfileGeneralTab />
            </TabPanel>
            <TabPanel>
              <Suspense
                fallback={
                  <DeferredComponent>
                    <ProfileEvalTabSkeleton />
                  </DeferredComponent>
                }
              >
                <ProfileEvalTab />
              </Suspense>
            </TabPanel>
          </Tabs>
        </VStack>
      </ProfilePageLayout>
    </>
  );
};

const ProfilePageLayout = styled.div`
  width: 100%;
`;
