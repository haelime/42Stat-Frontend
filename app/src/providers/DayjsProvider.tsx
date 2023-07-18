import { PropsWithReactElementChildren } from '@/types/PropsWithChildren';
import weekOfMonth from '@utils/plugin/weekOfMonth';
import dayjs from 'dayjs';

const Provider = ({ children }: PropsWithReactElementChildren) => {
  dayjs.extend(weekOfMonth);
  return <>{children}</>;
};

export default Provider;
