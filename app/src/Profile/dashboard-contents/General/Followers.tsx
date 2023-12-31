import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { DashboardContent } from '@shared/components/DashboardContent';
import {
  DashboardContentBadRequest,
  DashboardContentLoading,
  DashboardContentNotFound,
} from '@shared/components/DashboardContentView/Error';
import { ALT } from '@shared/constants/accessibility';
import { ROUTES } from '@shared/constants/routes';
import { Avatar, Text } from '@shared/ui-kit';

import { UserProfileContext } from '@/Profile/contexts/UserProfileContext';
import { GET_FOLLOWER_LIST_PREVIEW } from '@/Profile/dashboard-contents-queries/GET_FOLLOW_DATA';

export const Followers = () => {
  const { login } = useContext(UserProfileContext);
  const theme = useTheme();

  const title = 'Followers';

  const { data, loading, error, refetch } = useQuery(
    GET_FOLLOWER_LIST_PREVIEW,
    {
      variables: { login },
    },
  );

  //todo: update될때만 요청하도록 수정 필요
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <DashboardContentLoading title={title} />;
  }
  if (error) {
    return <DashboardContentBadRequest title={title} message={error.message} />;
  }
  if (!data) {
    return <DashboardContentNotFound title={title} />;
  }

  const followingList = data.getFollowerList.followList.map(
    (item) => item.user,
  );
  const totalCount = data.getFollowerList.count;

  return (
    <DashboardContent title={title}>
      <Link to={ROUTES.PROFILE_FOLLOWING_OF(login)}>
        <Layout>
          {followingList.map((user) => (
            <Avatar
              key={user.login}
              name={user.login}
              src={user.imgUrl}
              alt={ALT.AVATAR_OF(user.login)}
              radius={theme.radius.xs}
            />
          ))}
          <Text style={{ marginLeft: '1rem' }}>
            {totalCount === 0 ? '팔로워 0' : totalCount}
          </Text>
        </Layout>
      </Link>
    </DashboardContent>
  );
};

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1.5rem 0.5rem 0.5rem;
  &:hover {
    border-radius: ${({ theme }) => theme.radius.xs};
    border: 1.5px solid ${({ theme }) => theme.colors.mono.gray400};
  }
`;
