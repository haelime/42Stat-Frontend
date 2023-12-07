import styled from '@emotion/styled';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';

import { calculatorUserInfoAtom } from '@/Calculator/atoms/calculatorUserInfoAtom';
import { subjectListAtom } from '@/Calculator/atoms/subjectListAtom';
import { useSubjectList } from '@/Calculator/hooks/useSubjectList';
import { CustomTooltip } from '@shared/components/CustomTooltip';
import {
  Body1MediumText,
  HStack,
  Text,
  VStack,
  WritableNum,
} from '@shared/ui-kit';

export const CalculatorBasicInfoInputGroup = () => {
  const [calculatorUserInfo, setCalculatorUserInfo] = useAtom(
    calculatorUserInfoAtom,
  );
  const { currentLevel, daysFromStart, currentBlackhole } = calculatorUserInfo;
  const subjectList = useAtomValue(subjectListAtom);
  const { updateSubjectList } = useSubjectList();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 0) return;
    const name = e.target.name as keyof typeof calculatorUserInfoAtom;
    setCalculatorUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //handleChange에서 updateSubjectList를 호출할 때 update되지 않는 문제
  useEffect(() => {
    updateSubjectList(subjectList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatorUserInfo]);

  return (
    <VStack align="start" spacing="1rem">
      <HStack spacing="2rem">
        <HStack w="13rem" justify="start" spacing="1rem">
          <Body1MediumText>현재 레벨</Body1MediumText>
          <CustomTooltip text="레벨이 8.41을 넘으면, 블랙홀 기간이 늘지 않아요." />
        </HStack>
        <InputLayout>
          <WritableNum
            name="currentLevel"
            min="0"
            max="30"
            step="0.01"
            value={currentLevel}
            onChange={handleChange}
            style={{ width: '5rem' }}
          />
        </InputLayout>
      </HStack>
      <HStack spacing="2rem">
        <HStack w="13rem" justify="start" spacing="1rem">
          <Body1MediumText>현재 블랙홀</Body1MediumText>
          <CustomTooltip text="현재 블랙홀 + 본 과정 시작 날짜가 671일이 넘으면, 블랙홀 기간이 늘지 않아요." />
        </HStack>
        <HStack spacing="0.3rem">
          <InputLayout>
            <WritableNum
              name="currentBlackhole"
              min="0"
              value={currentBlackhole}
              onChange={handleChange}
              style={{ width: '5rem' }}
            />
          </InputLayout>
          <Text>일</Text>
        </HStack>
      </HStack>
      <HStack spacing="2rem">
        <HStack w="13rem" justify="start" spacing="1rem">
          <Body1MediumText>본과정 시작한지</Body1MediumText>
          <CustomTooltip
            type="warning"
            size="16"
            text="추가 지급된 블랙홀은 직접 빼주세요. (6~8기: 6일 / 9기: 5일 / 10기: 1일)"
          />
        </HStack>
        <HStack spacing="0.3rem">
          <InputLayout>
            <WritableNum
              name="daysFromStart"
              min="0"
              value={daysFromStart}
              onChange={handleChange}
              style={{ width: '5rem' }}
            />
          </InputLayout>
          <Text>일</Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

const InputLayout = styled.div`
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: all 0.2s;
  border: 1px solid ${({ theme }) => theme.colors.mono.gray200};

  &:hover {
    border-color: ${({ theme }) => theme.colors.mono.gray300};
  }
  color: ${({ theme }) => theme.colors.mono.black};
  background: ${({ theme }) => theme.colors.background.box.default};
`;
