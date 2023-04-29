import { NavMenuOption } from '@/utils/types/NavMenu';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavMenuIcon } from './common/NavMenuIcon';

type MobileNavItemProps = {
  option: NavMenuOption;
};

export const MobileNavItem = ({ option }: MobileNavItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFocused = location.pathname === option.path;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(option.path);
  };

  return (
    <MobileNavItemLayout onClick={handleClick} isFocused={isFocused}>
      <NavMenuIcon size="24px" menu={option.menu} isFocused={isFocused} />
    </MobileNavItemLayout>
  );
};

type MobileNavItemLayoutProps = {
  isFocused: boolean;
};

const MobileNavItemLayout = styled.li<MobileNavItemLayoutProps>`
  cursor: pointer;
`;
