import { Subject } from '@/Calculator/types/OrderItemButtonGroup';

export const checkDuplicateSubject = (subjects: Subject[], subject: string) => {
  if (!subjects.length || subject === '') return false;
  const isDuplicate = subjects.some((item) => {
    return item.name === subject;
  });
  return isDuplicate;
};
