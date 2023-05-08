import { HStack, Text } from '@/components/common';
import type { NavMenuOption } from '@/utils/types/NavMenu';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavMenuIcon } from './NavMenuIcon';

type DesktopNavItemProps = {
  option: NavMenuOption;
};

export const AboveTabletNavItem = ({ option }: DesktopNavItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFocused = location.pathname === option.path;
  const theme = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(option.path);
  };

  return (
    <DesktopNavItemLayout onClick={handleClick} isFocused={isFocused}>
      <HStack spacing="1.5rem" justify="start">
        <NavMenuIcon
          menu={option.menu}
          color={isFocused ? theme.colors.mono.white : theme.colors.mono.black}
        />
        <Text color={isFocused ? theme.colors.mono.white : 'inherit'}>
          {option.text}
        </Text>
      </HStack>
    </DesktopNavItemLayout>
  );
};

type DesktopNavItemLayoutProps = {
  isFocused: boolean;
};

const DesktopNavItemLayout = styled.li<DesktopNavItemLayoutProps>`
  width: 100%;
  padding: 1rem 0 1rem 2rem;
  border-radius: 2rem;
  cursor: pointer;
  background-color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.primary.default : 'transparent'};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ isFocused, theme }) =>
      isFocused ? theme.colors.primary.default : theme.colors.primary.light};
  }
`;
