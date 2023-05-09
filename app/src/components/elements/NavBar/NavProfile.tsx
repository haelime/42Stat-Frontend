import {
  Avatar,
  CaptionText,
  H3BoldText,
  HStack,
  VStack,
} from '@/components/common';
import { titleCase } from '@/utils/titleCase';
import { useTheme } from '@emotion/react';

type NavProfile = {
  imgUrl: string;
  name: string;
  login: string;
};

export const NavProfile = ({ imgUrl, name, login }: NavProfile) => {
  const theme = useTheme();

  return (
    <HStack spacing="2rem">
      <Avatar size="4rem" imgUrl={imgUrl} />
      <VStack align="start" spacing="0.3rem">
        <H3BoldText>{login}</H3BoldText>
        <CaptionText color={theme.colors.mono.gray300}>
          {titleCase(name)}
        </CaptionText>
      </VStack>
    </HStack>
  );
};
