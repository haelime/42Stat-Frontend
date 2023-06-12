import { gql } from '@/__generated__';
import { useQuery } from '@apollo/client';
import { Loader } from '@components/common';
import {
  ApolloBadRequest,
  ApolloNotFound,
} from '@components/elements/DashboardContentView';
import { TextDefault } from '@components/elements/DashboardContentView/Text';
import { DashboardContent } from '@components/templates/DashboardContent';
import { useParams } from 'react-router-dom';

const GET_LAST_PASS = gql(/* GraphQL */ `
  query getLastPass($login: String!) {
    getPersonalGeneralPage(login: $login) {
      teamInfo {
        lastPassed
      }
    }
  }
`);

export const LastPass = () => {
  const { username } = useParams() as { username: string };

  const title = '최근 통과한 과제';
  const { loading, error, data } = useQuery(GET_LAST_PASS, {
    variables: { login: username },
  });
  if (loading)
    return (
      <DashboardContent title={title}>
        <Loader />
      </DashboardContent>
    );
  if (error)
    return (
      <DashboardContent title={title}>
        <ApolloBadRequest msg={error.message} />
      </DashboardContent>
    );
  if (!data)
    return (
      <DashboardContent title={title}>
        <ApolloNotFound />
      </DashboardContent>
    );

  const { lastPassed } = data.getPersonalGeneralPage.teamInfo;

  return (
    <DashboardContent title={title}>
      <TextDefault text={lastPassed ?? '-'} />
    </DashboardContent>
  );
};
