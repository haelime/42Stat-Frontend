import styled from '@emotion/styled';

type StackProps = Partial<{
  w: string;
  h: string;
  spacing: number;
}>;

export const HStack = styled.div<StackProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ spacing = 0 }) => spacing}px;
  width: ${({ w = 'auto' }) => w};
  height: ${({ h = 'auto' }) => h};
`;

export const VStack = styled.div<StackProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ spacing = 0 }) => spacing}px;
  width: ${({ w = 'auto' }) => w};
  height: ${({ h = 'auto' }) => h};
`;
