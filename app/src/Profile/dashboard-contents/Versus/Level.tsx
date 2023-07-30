import { useQuery } from '@apollo/client';
import { userAtom } from '@shared/atoms/userAtom';
import { DashboardContent } from '@shared/components/DashboardContent';
import {
  DashboardContentBadRequest,
  DashboardContentLoading,
  DashboardContentNotFound,
} from '@shared/components/DashboardContentView/Error';
import { NumberVersus } from '@shared/components/DashboardContentView/Number/NumberVersus';
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';
import { GET_VERSUS_ZERO_COST } from '../../dashboard-contents-queries/GET_VERSUS_ZERO_COST';

export const Level = () => {
  const { login } = useParams() as { login: string };
  const user = useAtomValue(userAtom);

  const title = '레벨';
  const { loading, error, data } = useQuery(GET_VERSUS_ZERO_COST, {
    variables: { login1: login, login2: user.login },
  });

  if (loading) {
    return <DashboardContentLoading title={title} />;
  }
  if (error) {
    return <DashboardContentBadRequest title={title} message={error.message} />;
  }
  if (!data) {
    return <DashboardContentNotFound title={title} />;
  }

  const {
    data1: {
      userProfile: { level },
    },
    data2: {
      userProfile: { level: myLevel },
    },
  } = data;
  const unit = '';

  return (
    <DashboardContent title={title}>
      <NumberVersus number1={level} number2={myLevel} unit={unit} />
    </DashboardContent>
  );
};
