import { gql } from '@/__generated__';
import { Loader } from '@/components/common';
import {
  ApolloBadRequest,
  ApolloNotFound,
} from '@/components/elements/DashboardContentView';
import { Rank } from '@/components/elements/DashboardContentView/Rank';
import { DashboardContent } from '@/components/templates/Dashboard';
import type { RankItemType } from '@/utils/types/Rank';
import { useQuery } from '@apollo/client';

const GET_WALLET_RANK = gql(/* GraphQL */ `
  query getWalletRank {
    getTotalPage {
      walletRanks {
        userPreview {
          id
          login
          imgUrl
        }
        value
      }
    }
  }
`);

export const WalletRanks = () => {
  const title = '보유 월렛 랭킹';
  const { loading, error, data } = useQuery(GET_WALLET_RANK);
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

  const { walletRanks } = data.getTotalPage;
  const unit = '₳';

  const rankList: RankItemType[] = walletRanks.map(
    ({ userPreview, value }) => ({
      name: userPreview.login,
      value: value,
      imgUrl: userPreview.imgUrl,
    }),
  );

  return (
    <DashboardContent title={title}>
      <Rank rankList={rankList} cnt={5} unit={unit} />
    </DashboardContent>
  );
};
