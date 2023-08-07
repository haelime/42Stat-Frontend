import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactComponent as GithubLogo } from '@shared/assets/logo/github-logo.svg';
import { ARIA_LABEL_LINK } from '@shared/constants/accessibility/ARIA_LABEL';
import { CaptionText, HStack } from '@shared/ui-kit';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const theme = useTheme();

  return (
    <Layout>
      <HStack spacing="1rem">
        <CaptionText color={theme.colors.mono.gray300}>
          © 2023. 42Stat.
        </CaptionText>
        <Link
          to="https://github.com/orgs/42Statistics/repositories"
          target="_blank"
          rel="noreferrer"
          aria-label={ARIA_LABEL_LINK.STAT_GITHUB}
        >
          <GithubLogo width={16} height={16} fill={theme.colors.mono.gray300} />
        </Link>
      </HStack>
    </Layout>
  );
};

const Layout = styled.footer`
  width: 100%;
  padding: 8rem 2rem 2rem 2rem;
`;
