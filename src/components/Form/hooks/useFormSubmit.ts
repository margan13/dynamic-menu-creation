import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { useErrors } from './useErrors';

export const useFormSubmit = <T extends FieldValues>(
  form: UseFormReturn<T>,
  callback: SubmitHandler<T>,
): {
  errors: string[];
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
} => {
  const { errors, handleErrors, resetErrors } = useErrors();

  return {
    errors,
    onSubmit: form.handleSubmit(async (data) => {
      try {
        form.clearErrors();
        resetErrors();

        return await callback(data);
      } catch (error) {
        throw handleErrors(error);
      }
    }),
  };
};
