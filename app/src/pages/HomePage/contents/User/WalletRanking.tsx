import { useQuery } from '@apollo/client';
import {
  DashboardContentBadRequest,
  DashboardContentLoading,
  DashboardContentNotFound,
} from '@components/elements/DashboardContentView/Error';
import { UserRankList } from '@components/elements/DashboardContentView/Ranking/UserRankList';
import { DashboardContent } from '@components/templates/DashboardContent';
import { GET_HOME } from '@pages/HomePage/GET_HOME';
import { Mobile, TabletAndAbove } from '@utils/responsive/Device';

export const WalletRanking = () => {
  const title = '보유 월렛 랭킹';
  const { loading, error, data } = useQuery(GET_HOME);
  if (loading) return <DashboardContentLoading title={title} />;
  if (error)
    return <DashboardContentBadRequest title={title} message={error.message} />;
  if (!data) return <DashboardContentNotFound title={title} />;

  const { walletRanking } = data.getHomeUser;
  const unit = '₳';

  return (
    <DashboardContent title={title}>
      <TabletAndAbove>
        <UserRankList list={walletRanking} cnt={5} unit={unit} />
      </TabletAndAbove>
      <Mobile>
        <UserRankList list={walletRanking} cnt={3} unit={unit} />
      </Mobile>
    </DashboardContent>
  );
};
