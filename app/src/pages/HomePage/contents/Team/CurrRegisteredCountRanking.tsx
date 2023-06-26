import { gql } from '@/__generated__';
import { useQuery } from '@apollo/client';
import { Loader } from '@components/common';
import {
  ApolloBadRequest,
  ApolloNotFound,
} from '@components/elements/DashboardContentView/Error';
import { RankingDefault } from '@components/elements/DashboardContentView/RankingDefault';
import { DashboardContent } from '@components/templates/DashboardContent';
import { Mobile, TabletAndAbove } from '@utils/responsive/Device';
import type { RankingItemType } from '@utils/types/Ranking';

const GET_CURR_REGISTERED_COUNT_RANKING = gql(/* GraphQL */ `
  query GetCurrRegisteredCountRanking {
    getHomeTeam {
      currRegisteredCountRanking(limit: 5) {
        projectPreview {
          id
          name
          url
        }
        rank
        value
      }
    }
  }
`);

export const CurrRegisteredCountRanking = () => {
  const title = '지금 가장 많은 사람이 참여하는 과제는?';
  const { loading, error, data } = useQuery(GET_CURR_REGISTERED_COUNT_RANKING);

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

  const { currRegisteredCountRanking } = data.getHomeTeam;
  const unit = '명';

  const list: RankingItemType[] = currRegisteredCountRanking.map(
    ({ projectPreview, value, rank }) => ({
      id: projectPreview.id,
      name: projectPreview.name,
      value: value,
      rank: rank,
    }),
  );

  return (
    <DashboardContent title={title}>
      <TabletAndAbove>
        <RankingDefault list={list} cnt={5} unit={unit} />
      </TabletAndAbove>
      <Mobile>
        <RankingDefault list={list} cnt={3} unit={unit} />
      </Mobile>
    </DashboardContent>
  );
};
