import { ReactComponent as MdLogTime } from '@/Profile/assets/activity/log-time.svg';
import { UserProfileContext } from '@/Profile/contexts/UserProfileContext';
import { useTheme } from '@emotion/react';
import type { GetDailyActivityDetailRecordsQuery } from '@shared/__generated__/graphql';
import { Text, VStack } from '@shared/ui-kit';
import { useContext } from 'react';
import { TimelineItem } from '../TimelineItem';
import { DailyCorrected } from './DailyCorrected';
import { DailyCorrector } from './DailyCorrector';
import { DailyEvent } from './DailyEvent';
import { DailyLogTime } from './DailyLogTime';

type DailyActivityDetailContentProps = {
  data?: GetDailyActivityDetailRecordsQuery;
  timeRecord: number;
};

export const DailyActivityDetailContent = ({
  data,
  timeRecord,
}: DailyActivityDetailContentProps) => {
  const { coalition } = useContext(UserProfileContext);
  const theme = useTheme();

  const color = coalition?.color ?? theme.colors.mono.black;

  if (!data) {
    return null; // FIXME: handling
  }

  return (
    <VStack w="100%" align="start">
      <DailyLogTime timeRecord={timeRecord} color={color} />
      {data.getPersonalGeneral.dailyActivityDetailRecords.map((item, index) => {
        if ('teamId' in item) {
          if (item.type === 'CORRECTED')
            return <DailyCorrected key={index} data={item} color={color} />;
          else return <DailyCorrector key={index} data={item} color={color} />;
        } else {
          return <DailyEvent key={index} data={item} color={color} />;
        }
      })}
    </VStack>
  );
};
