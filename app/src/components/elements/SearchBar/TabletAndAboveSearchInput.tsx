import { HStack, Input } from '@components/common';
import { MdSearch } from '@react-icons/all-files/md/MdSearch';

type TabletAndAboveSearchInputProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  setInput: (input: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setIsFocused: (isFocused: boolean) => void;
};

export const TabletAndAboveSearchInput = ({
  inputRef,
  setInput,
  onKeyDown,
  setIsFocused,
}: TabletAndAboveSearchInputProps) => {
  return (
    <HStack spacing="2rem">
      <MdSearch id="search-icon" size="24px" />
      <Input
        ref={inputRef}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search..."
      />
    </HStack>
  );
};
