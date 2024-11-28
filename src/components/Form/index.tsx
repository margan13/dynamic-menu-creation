import { FormEventHandler, ReactNode } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { cn } from '../../utils';

export interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  className?: string;
}

export const Form = <T extends FieldValues>({
  form,
  children,
  className,
  onSubmit,
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        className={cn('flex flex-1 flex-col gap-2', className)}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </FormProvider>
  );
};
