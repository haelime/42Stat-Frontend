import styled from '@emotion/styled';

type DashboardItemWrapperProps = {
  row: number; // TODO: 더 엄밀한 Type 필요
  col: number;
  rowSpan: number;
  colSpan: number;
  element: React.ReactNode;
};

export const DashboardItemWrapper = ({
  element,
  ...propsExceptElement
}: DashboardItemWrapperProps) => {
  return (
    <DashboardItemWrapperLayout {...propsExceptElement}>
      {element}
    </DashboardItemWrapperLayout>
  );
};

type DashboardItemWrapperLayoutProps = {
  col: number;
  colSpan: number;
  row: number;
  rowSpan: number;
};

const DashboardItemWrapperLayout = styled.div<DashboardItemWrapperLayoutProps>`
  grid-column: ${({ col, colSpan }) => `${col} / span ${colSpan}`};
  grid-row: ${({ row, rowSpan }) => `${row} / span ${rowSpan}`};
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.mono.white};
  box-shadow: 10px 10px 10px #eeeeee, -10px -10px 10px #ffffff;

  transition: all 0.3s;
  :hover {
    transform: scale(100.5%);
    box-shadow: 10px 10px 10px #dddddd, -10px -10px 10px #ffffff;
  }
  :active {
    box-shadow: inset 10px 10px 10px #f2f2f2, inset -10px -10px 10px #ffffff;
  }
`;
