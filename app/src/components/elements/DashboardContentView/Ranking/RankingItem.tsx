import type { RankingItemType, RankingUserItemType } from '@/types/Ranking';
import {
  Avatar,
  H2BoldText,
  H3BoldText,
  HStack,
  MediumText,
} from '@components/common';
import { useTheme } from '@emotion/react';
import { numberWithUnitFormatter } from '@utils/formatters';
import { Link } from 'react-router-dom';

type RankingItemProps = {
  item: RankingItemType | RankingUserItemType;
  link?: string;
  unit: string;
};

export const RankingItem = ({ item, link, unit }: RankingItemProps) => {
  const theme = useTheme();
  const { name, value, rank } = item;
  const color =
    rank === 1 ? theme.colors.accent.default : theme.colors.mono.black;

  return (
    <HStack w="80%" spacing="2.4rem">
      <H2BoldText color={color}>{rank}</H2BoldText>
      {'imgUrl' in item && <Avatar src={item.imgUrl} />}
      <HStack
        w="100%"
        spacing="1rem"
        align="baseline"
        justify="start"
        wrap="wrap"
      >
        {link !== undefined ? (
          <Link to={link}>
            <H3BoldText color={color}>{name}</H3BoldText>
          </Link>
        ) : (
          <H3BoldText color={color}>{name}</H3BoldText>
        )}
        <MediumText color={color}>
          {numberWithUnitFormatter(value, unit)}
        </MediumText>
      </HStack>
    </HStack>
  );
};
