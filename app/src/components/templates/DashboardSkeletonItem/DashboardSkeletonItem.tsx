import { VStack } from '@/components/common';
import styled from '@emotion/styled';

export const DashboardSkeletonItem = () => {
  return (
    <DashboardSkeletonItemLayout>
      <VStack w="100%" h="100%" spacing="2rem" align="start">
        <DashboardSkeletonItemHeader />
        <DashboardSkeletonItemContents />
      </VStack>
    </DashboardSkeletonItemLayout>
  );
};

const DashboardSkeletonItemLayout = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const DashboardSkeletonItemHeader = styled.div`
  width: 100%;
  height: 3rem;
  border-radius: 1.4rem;
  background-color: ${({ theme }) => theme.colors.mono.gray[200]};
`;

const DashboardSkeletonItemContents = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1.4rem;
  background-color: ${({ theme }) => theme.colors.mono.gray[200]};
`;
