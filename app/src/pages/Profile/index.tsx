import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DesktopDashboard } from '@/components/elements/Dashboard';
import { DesktopDashboardRow } from '@/components/elements/DashboardRow';
import { DashboardItemContainer } from '@/components/elements/DashboardItemContainer';
import { DashboardItem } from '@/components/elements/DashboardItem';
import { UserProfile } from './contents';
import { Suspense, useState } from 'react';
import { ProfileTabBar } from './ProfileTabBar';
import { useProfilePage } from './hooks/useProfilePage';
import { ProfileMenu } from '@/utils/types/ProfileMenu';
import styled from '@emotion/styled';
import { lazyImport } from '@/utils/lazyImport';
import { Spinner } from '@/components/common';

const { ProfileGeneralPage } = lazyImport(
  () => import('@/pages/ProfileGeneral'),
  'ProfileGeneralPage',
);
const { ProfileEvaluationPage } = lazyImport(
  () => import('@/pages/ProfileEvaluation'),
  'ProfileEvaluationPage',
);

export const ProfilePage = () => {
  const { username } = useParams();
  const { options } = useProfilePage();
  const [selected, setSelected] = useState<ProfileMenu>('General');

  return (
    <>
      <Helmet>
        <title>{username} | 42Stat</title>
      </Helmet>
      <DesktopDashboard>
        <DesktopDashboardRow row={2} col={3}>
          <DashboardItemContainer
            row={1}
            col={1}
            rowSpan={2}
            colSpan={3}
            element={<DashboardItem content={UserProfile} />}
          ></DashboardItemContainer>
        </DesktopDashboardRow>
      </DesktopDashboard>
      <ProfileTabBarLayout>
        <ProfileTabBar
          value={selected}
          onChange={setSelected}
          options={options}
        />
      </ProfileTabBarLayout>

      <Suspense fallback={<Spinner />}>
        {selected === 'General' ? (
          <ProfileGeneralPage />
        ) : (
          <ProfileEvaluationPage />
        )}
      </Suspense>
    </>
  );
};

const ProfileTabBarLayout = styled.div`
  width: 100%;
  padding: 4rem 3rem;
`;
