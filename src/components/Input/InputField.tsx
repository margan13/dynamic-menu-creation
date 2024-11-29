import { useId } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { Input, InputProps } from 'src/components/Input';

export type InputFieldProps = UseControllerProps &
  Omit<InputProps, 'error' | 'checked' | 'onChange'>;

export const InputField = ({
  name,
  defaultValue,
  ...props
}: InputFieldProps) => {
  const id = useId();

  const { field, fieldState } = useController({
    name,
    defaultValue,
  });

  return (
    <Input
      {...field}
      name={`${field.name}_${id}`}
      value={field.value ?? ''}
      error={fieldState.error}
      {...props}
    />
  );
};
