import { ApolloErrorView } from '@shared/components/ApolloErrorView';
import {
  DashboardContent,
  DashboardContentProps,
} from '@shared/components/DashboardContent';

type DashboardContentBadRequestProps = {
  message?: string;
} & Omit<DashboardContentProps, 'children' | 'isApexChart'>;

export const DashboardContentBadRequest = ({
  message = 'Something Went Wrong',
  ...propsExceptMessage
}: DashboardContentBadRequestProps) => {
  return (
    <DashboardContent {...propsExceptMessage}>
      <ApolloErrorView message={message} />
    </DashboardContent>
  );
};
