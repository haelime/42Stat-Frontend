import { gql } from '@/__generated__';
import { Spinner } from '@/components/common';
import { Rank } from '@/components/elements/DashboardContentView/Rank';
import { BelowTablet, Desktop } from '@/utils/responsive/Device';
import { RankItemType } from '@/utils/types/Rank';
import { useQuery } from '@apollo/client';

const GET_LEVEL_RANK = gql(/* GraphQL */ `
  query GetLevelRank {
    getHomePage {
      levelRank {
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

export const LevelRank = () => {
  const { loading, error, data } = useQuery(GET_LEVEL_RANK);

  if (loading) return <Spinner />;
  if (error) {
    return <h1>{error.message}</h1>;
  }
  if (!data) {
    return <h1>user not found</h1>;
  }

  const { levelRank } = data.getHomePage;
  const unit = '';

  const rankList: RankItemType[] = levelRank.map(({ userPreview, value }) => ({
    name: userPreview.login,
    value: value,
    imgUrl: userPreview.imgUrl,
  }));

  const rankListWithoutImgUrl: RankItemType[] = rankList.map(
    ({ name, value }) => ({ name, value }),
  );

  return (
    <>
      <Desktop>
        <Rank rankList={rankList} cnt={3} unit={unit} />
      </Desktop>
      <BelowTablet>
        <Rank rankList={rankListWithoutImgUrl} cnt={3} unit={unit} />
      </BelowTablet>
    </>
  );
};
