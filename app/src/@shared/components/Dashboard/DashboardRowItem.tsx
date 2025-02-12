import styled from '@emotion/styled';

import { DashboardRowItemProps } from '@shared/types/Dashboard';
import { CustomBox } from '@shared/ui-kit-styled';

export const DashboardRowItem = ({
  content: Content,
  ...props
}: DashboardRowItemProps) => {
  return (
    <Layout {...props}>
      <Content />
    </Layout>
  );
};

type LayoutProps = Omit<DashboardRowItemProps, 'content'>;

const Layout = styled(CustomBox)<LayoutProps>`
  grid-column: ${({ colSpan }) => `span ${colSpan}`};
  grid-row: ${({ rowSpan }) => `span ${rowSpan}`};
`;
