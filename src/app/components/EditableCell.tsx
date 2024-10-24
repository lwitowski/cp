import { useEffect, useState } from 'react';
import { useUpdateInvestment } from './mutations';

interface IProps {
  initialValue: string;
  rowId: string;
}

export const EditableCell = ({ initialValue, rowId }: IProps) => {
  const updateInvestment = useUpdateInvestment();

  const [value, setValue] = useState(initialValue);

  const onBlur = async () => {
    if (initialValue === value) {
      return;
    }

    updateInvestment.mutate({ id: rowId, quantity: parseInt(value as string) });
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value as string}
      onChange={(event) => setValue(event.target.value)}
      onBlur={onBlur}
    />
  );
}