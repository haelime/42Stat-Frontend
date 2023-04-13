import {
  MobileDashboardColSize,
  MobileDashboardRowSize,
} from '@/utils/types/Dashboard';
import styled from '@emotion/styled';

type MobileDashboardRowProps = {
  row: MobileDashboardRowSize;
  col: MobileDashboardColSize;
  children: React.ReactNode;
};

export const MobileDashboardRow = ({
  children,
  ...propsExceptChildren
}: MobileDashboardRowProps) => {
  return (
    <MobileDashboardRowLayout {...propsExceptChildren}>
      {children}
    </MobileDashboardRowLayout>
  );
};

type MobileDashboardRowLayoutProps = {
  row: MobileDashboardRowSize;
  col: MobileDashboardColSize;
};

const MobileDashboardRowLayout = styled.div<MobileDashboardRowLayoutProps>`
  display: grid;
  grid-template-columns: ${({ col }) => `repeat(${col}, 1fr)`};
  grid-template-rows: ${({ row, col }) =>
    `repeat(${row}, ${col === 2 ? '15rem' : '60rem'})`};
  column-gap: 1.5rem;
  row-gap: 1.5rem;
  width: 100%;
`;
