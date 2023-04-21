import { gql } from '@/__generated__';
import { EvalLogs } from '@/__generated__/graphql';
import { Divider, HStack, Text, VStack } from '@/components/common';
import { useApolloClient, useQuery } from '@apollo/client';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RxTriangleLeft, RxTriangleRight } from 'react-icons/rx';
import { EvalLogUnit } from './EvalLogUnit';

type GetEvalLogsQueryVariables = {
  pageSize: number;
  pageNumber: number;
  projectName: string;
  outstandingOnly: boolean;
  corrector?: string;
  corrected?: string;
};

type FormValues = {
  subject: string;
  from: string;
  to: string;
  outstanding: boolean;
};

//TODO: 실제로는 안쓰는 필드들은 받아오지 않게 나중에 완성하고 수정필요
const GET_EVAL_LOGS = gql(/* GraphQL */ `
  query GetEvalLogs(
    $pageSize: Int!
    $pageNumber: Int!
    $projectName: String!
    $outstandingOnly: Boolean!
    $corrector: String
    $corrected: String
  ) {
    getEvalLogs(
      pageSize: $pageSize
      pageNumber: $pageNumber
      projectName: $projectName
      outstandingOnly: $outstandingOnly
      corrector: $corrector
      corrected: $corrected
    ) {
      header {
        corrector {
          id
          login
          imgUrl
        }
        teamPreview {
          id
          name
          url
        }
        beginAt
        projectPreview {
          id
          name
          url
        }
        flag {
          id
          name
          isPositive
        }
      }
      correctorReview {
        mark
        review
      }
      correctedsReview {
        mark
        review
      }
    }
  }
`);

export const EvalSearchBoard = () => {
  const { register, handleSubmit, watch } = useForm();
  const theme = useTheme();
  const pageSize = 2;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [evalLogs, setEvalLogs] = useState<EvalLogs[]>([]);
  const client = useApolloClient();

  const { loading, error, data, refetch } = useQuery(GET_EVAL_LOGS, {
    variables: {
      pageSize,
      pageNumber,
      projectName: 'libft',
      outstandingOnly: false,
      corrector: '',
      corrected: '',
    },
  });

  if (data) {
    setEvalLogs(data.getEvalLogs);
  }

  const handleSearch: SubmitHandler<FormValues> = async (result) => {
    refetch({
      pageSize,
      pageNumber,
      projectName: result.subject,
      outstandingOnly: result.outstanding,
      corrector: result.from,
      corrected: result.to,
    });
    // setProjectName(watch('subject'));
    // setCorrector(watch('from'));
    // setCorrected(watch('to'));
    // setOutstandingOnly(watch('outstanding'));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // handleSearch();
    }
  };

  // const handleRadioChange = (e: SyntheticEvent<HTMLInputElement>) => {
  //   const { value } = e.target as HTMLInputElement;
  //   setOutstandingOnly(value === 'true');
  // };

  // if (loading) return <Spinner />;
  // if (error) {
  //   return <h1>{error.message}</h1>;
  // }
  // if (!data) {
  //   return <h1>user not found</h1>;
  // }

  return (
    <EvalSearchBoardLayout>
      <form css={{ width: '100%' }} onSubmit={handleSubmit(handleSearch)}>
        <HStack w="100%" h="100%">
          <VStack align="start" spacing="1rem">
            <HStack w="100%" css={{ justifyContent: 'flex-start' }}>
              <StyledLabel htmlFor="subject">SUBJECT</StyledLabel>
              <StyledInput
                id="subject"
                {...register('subject')}
                name="subject"
                // ref={projectNameRef}
                onKeyDown={handleKeyDown}
              />
            </HStack>
            <HStack w="100%" css={{ justifyContent: 'flex-start' }}>
              <StyledLabel htmlFor="from">FROM</StyledLabel>
              <StyledInput
                id="from"
                {...register('from')}
                name="from"
                // ref={correctorRef}
                onKeyDown={handleKeyDown}
              />
            </HStack>
            <HStack w="100%" css={{ justifyContent: 'flex-start' }}>
              <StyledLabel htmlFor="to">TO</StyledLabel>
              <StyledInput
                id="to"
                {...register('to')}
                name="to"
                // ref={correctedRef}
                onKeyDown={handleKeyDown}
              />
            </HStack>
            <HStack w="100%" css={{ justifyContent: 'flex-start' }}>
              <StyledLabel htmlFor="flag">OPTION</StyledLabel>
              <HStack spacing="2rem">
                <div>
                  <StyledRadioInput
                    id="flag"
                    type="radio"
                    {...register('outstanding')}
                    name="outstanding"
                    value="false"
                    checked={watch('outstanding') === 'false'}
                    // checked={outstandingOnly}
                    // onChange={handleRadioChange}
                  />
                  전체
                </div>
                <div>
                  <StyledRadioInput
                    id="flag"
                    type="radio"
                    {...register('outstanding')}
                    name="outstanding"
                    value="true"
                    checked={watch('outstanding') === 'true'}
                    // checked={outstandingOnly}
                    // onChange={handleRadioChange}
                  />
                  Outstanding
                </div>
              </HStack>
            </HStack>
          </VStack>
          <div css={{ position: 'relative', width: '100%', height: '100%' }}>
            <StyledInputBtn type="submit" value="SEARCH" />
          </div>
        </HStack>
      </form>
      <Divider style={{ width: '100%' }} />
      <VStack
        w="100%"
        spacing="2rem"
        style={{
          justifyContent: 'flex-start',
          paddingRight: '4rem',
        }}
      >
        {evalLogs.map((v, idx) => (
          <EvalLogUnit key={idx} data={v} />
        ))}
        <HStack>
          <RxTriangleLeft
            size="30"
            color={theme.colors.primary.default}
            onClick={() => {
              setPageNumber((prev) => (prev > 1 ? prev - 1 : 1));
            }}
          />
          <Text
            style={{ letterSpacing: '0.5rem' }}
            fontSize={theme.fonts.size.h3}
          >
            {pageNumber}/n
          </Text>
          <RxTriangleRight
            size="30"
            color={theme.colors.primary.default}
            onClick={() => {
              setPageNumber((prev) => prev + 1);
              // TODO:maxpagenum 못넘게 설정 필요
            }}
          />
        </HStack>
      </VStack>
    </EvalSearchBoardLayout>
  );
};
const EvalSearchBoardLayout = styled(VStack)`
  background-color: ${({ theme }) => theme.colors.mono.white};
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  gap: 3rem;
  padding: 5rem;
  overflow-y: auto;
  transition: box-shadow 200ms ease-in-out, transform 200ms ease-in-out;
`;

const StyledLabel = styled.label`
  width: 10rem;
  color: ${({ theme }) => theme.colors.primary.default};
  text-align: center;
`;

const StyledInput = styled.input`
  padding: 0.8rem 2rem;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.colors.primary.light};
  border: none;
  :hover {
    box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  }
  outline-color: ${({ theme }) => theme.colors.primary.default};
`;

const StyledInputBtn = styled.input`
  padding: 0.8rem 2rem;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.colors.primary.default};
  color: ${({ theme }) => theme.colors.mono.white};
  border: none;
  :hover {
    box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  }
  outline: none;
  margin-top: 1rem;
  position: absolute;
  bottom: 0;
  left: 2rem;
`;

const StyledRadioInput = styled.input`
  margin-right: 1rem;
  // :checked {
  //   appearance: none;
  // TODO: appearance를제거하고 다시 그리는 방법 고안 필요
  //   background-color: purple;
  //   border-color: purple;
  // }
  :hover {
    cursor: pointer;
  }
`;
