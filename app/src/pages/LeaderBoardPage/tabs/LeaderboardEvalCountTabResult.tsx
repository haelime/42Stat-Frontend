import {
  GetLeaderboardEvalCountQuery,
  GetLeaderboardEvalCountQueryVariables,
} from '@/__generated__/graphql';
import { QueryResult } from '@apollo/client';
import { Divider, VStack } from '@components/common';
import { ApolloErrorView } from '@components/elements/ApolloErrorView';
import { ApolloNotFoundView } from '@components/elements/ApolloNotFoundView';
import { LeaderBoard } from '@components/templates/LeaderBoard';
import { LeaderBoardItem } from '@components/templates/LeaderBoard/LeaderBoardItem';
import { LeaderBoardTabResultSkeleton } from '@pages/PageSkeletons/LeaderBoardTabResultSkeleton';
import { isDefined } from '@utils/isDefined';

type LeaderboardEvalCountTabResultProps = {
  result: QueryResult<
    GetLeaderboardEvalCountQuery,
    GetLeaderboardEvalCountQueryVariables
  >;
};

export const LeaderboardEvalCountTabResult = ({
  result: { data, loading, error },
}: LeaderboardEvalCountTabResultProps) => {
  if (loading) return <LeaderBoardTabResultSkeleton />;
  if (error) return <ApolloErrorView message={error.message} />;
  if (!data) return <ApolloNotFoundView />;

  const { me, totalRanking } = data.getLeaderboardEvalCount.byDateTemplate.data;
  const unit = '회';

  const myRanking =
    me != null
      ? {
          id: me.userPreview.id,
          name: me.userPreview.login,
          value: me.value,
          rank: me.rank,
          imgUrl: me.userPreview.imgUrl,
        }
      : null;

  const list = totalRanking.nodes
    .filter(isDefined)
    .map(({ userPreview, value, rank }) => ({
      id: userPreview.id,
      name: userPreview.login,
      value: value,
      rank: rank,
      imgUrl: userPreview.imgUrl,
    }));

  return (
    <VStack w="100%" spacing="5rem">
      {myRanking && <LeaderBoardItem item={myRanking} unit={unit} isMe />}
      <Divider />
      <LeaderBoard list={list} me={myRanking} unit={unit} />
    </VStack>
  );
};
