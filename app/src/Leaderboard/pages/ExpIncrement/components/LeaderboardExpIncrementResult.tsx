import { useSearchParams } from 'react-router-dom';

import { QueryResult } from '@apollo/client';

import {
  DateTemplate,
  type Exact,
  type GetLeaderboardExpIncrementQuery,
  type InputMaybe,
} from '@shared/__generated__/graphql';
import { FullPageApolloErrorView } from '@shared/components/ApolloError/FullPageApolloErrorView';
import { ResponsivePagination } from '@shared/components/Pagination/ResponsivePagination';
import { HStack, Spacer, VStack } from '@shared/ui-kit';

import { Leaderboard } from '@/Leaderboard/components/Leaderboard';
import { LeaderboardDateDescriptor } from '@/Leaderboard/components/Leaderboard/LeaderboardDateDescriptor';
import { LeaderboardResultSkeleton } from '@/Leaderboard/components/skeletons/LeaderboardResultSkeleton';
import { SIZE_PER_PAGE } from '@/Leaderboard/constants/defaultOptions';
import { LEADERBOARD_PARAM_KEYS } from '@/Leaderboard/constants/paramKeys';
import { toLeaderboardArgs } from '@/Leaderboard/utils/toLeaderboardArgs';

type LeaderboardExpIncrementResultProps = {
  result: QueryResult<
    GetLeaderboardExpIncrementQuery,
    Exact<{
      pageSize: number;
      pageNumber: number;
      dateTemplate: DateTemplate;
      promo?: InputMaybe<number> | undefined;
    }>
  >;
};

export const LeaderboardExpIncrementResult = ({
  result: { loading, error, data },
}: LeaderboardExpIncrementResultProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { promo, dateTemplate, pageNumber, coalitionId } =
    toLeaderboardArgs(searchParams);
  const { PROMO, PAGE, DATE, COALITION } = LEADERBOARD_PARAM_KEYS;

  const handlePageNumberChange = (newPageNumber: number) => {
    const newURLSearchParams = new URLSearchParams();

    newURLSearchParams.set(DATE, dateTemplate);
    if (promo) {
      newURLSearchParams.set(PROMO, promo.toString());
    }
    if (coalitionId) {
      newURLSearchParams.set(COALITION, coalitionId.toString());
    }
    newURLSearchParams.set(PAGE, newPageNumber.toString());
    setSearchParams(newURLSearchParams);
  };

  if (loading) {
    return <LeaderboardResultSkeleton />;
  }
  if (error) {
    return <FullPageApolloErrorView message={error.message} />;
  }
  if (!data) {
    return <LeaderboardResultSkeleton />;
  }

  const {
    data: {
      me,
      totalRanking: { nodes, totalCount },
    },
    start,
    end,
  } = data.getLeaderboardExpIncrement.byDateTemplate;

  const unit = 'XP';

  return (
    <VStack w="100%" spacing="4rem">
      <VStack w="100%" spacing="1rem">
        <HStack w="100%">
          <Spacer />
          <LeaderboardDateDescriptor
            start={new Date(start)}
            end={new Date(end)}
          />
        </HStack>
        <Leaderboard me={me} list={nodes} unit={unit} />
      </VStack>
      <ResponsivePagination
        currPageNumber={pageNumber}
        onPageNumberChange={handlePageNumberChange}
        totalPageNumber={Math.ceil(totalCount / SIZE_PER_PAGE)}
      />
    </VStack>
  );
};
