import { gql } from '@/__generated__';
import { useQuery } from '@apollo/client';
import {
  DashboardContentBadRequest,
  DashboardContentLoading,
  DashboardContentNotFound,
} from '@components/elements/DashboardContentView/Error';
import { NumberDefault } from '@components/elements/DashboardContentView/NumberDefault';
import { DashboardContent } from '@components/templates/DashboardContent';
import { useParams } from 'react-router-dom';

const GET_AVERAGE_FEEDBACK_LENGTH_BY_LOGIN = gql(/* GraphQL */ `
  query GetAverageFeedbackLengthByLogin($login: String!) {
    getPersonalEval(login: $login) {
      averageFeedbackLength
    }
  }
`);

export const AverageFeedbackLength = () => {
  const { username } = useParams() as { username: string };

  const title = '평균 피드백 길이';
  const { loading, error, data } = useQuery(
    GET_AVERAGE_FEEDBACK_LENGTH_BY_LOGIN,
    {
      variables: { login: username },
    },
  );
  if (loading) return <DashboardContentLoading />;
  if (error) return <DashboardContentBadRequest message={error.message} />;
  if (!data) return <DashboardContentNotFound />;

  const { averageFeedbackLength } = data.getPersonalEval;
  const unit = '자';

  return (
    <DashboardContent title={title}>
      <NumberDefault number={averageFeedbackLength} unit={unit} />
    </DashboardContent>
  );
};
