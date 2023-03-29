import { gql } from '@/__generated__';
import { useQuery } from '@apollo/client';

const GET_CURR_WEEK_EVAL_CNT = gql(/* GraphQL */ `
  query GetCurrWeekEvalCnt {
    getHomePage {
      currWeekEvalCnt
      lastWeekEvalCnt
    }
  }
`);

export const CurrWeekEvalCnt = () => {
  const { loading, error, data } = useQuery(GET_CURR_WEEK_EVAL_CNT);

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!data) {
    return <h1>user not found</h1>;
  }

  const { currWeekEvalCnt, lastWeekEvalCnt } = data.getHomePage;

  return (
    <>
      {currWeekEvalCnt}/{lastWeekEvalCnt}
    </>
  );
};
