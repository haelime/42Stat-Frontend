import { gql } from '@/__generated__';
import {
  ApolloBadRequest,
  ApolloNotFound,
} from '@/components/elements/DashboardContentView';
import { NumberDefault } from '@/components/elements/DashboardContentView/Text';
import { useQuery } from '@apollo/client';

const GET_AVERAGE_DURATION = gql(/* GraphQL */ `
  query getAverageDuration($uid: Int!) {
    getPersonalEvalPage(uid: $uid) {
      averageDuration
    }
  }
`);

export const AverageDuration = () => {
  const { loading, error, data } = useQuery(GET_AVERAGE_DURATION, {
    variables: {
      uid: 99947,
    },
  });

  if (loading) return <></>;
  if (error) return <ApolloBadRequest msg={error.message} />;
  if (!data) return <ApolloNotFound />;

  const { averageDuration } = data.getPersonalEvalPage;
  const unit = '분';

  return <NumberDefault number={averageDuration} unit={unit} />;
};
