import { useCallback, useState } from 'react';

export const toErrorMessage = (error: unknown): string[] => {
  if (Array.isArray(error)) {
    return error;
  }

  if (typeof error === 'string') {
    return [error];
  }

  return ['some error occurred'];
};

export const useErrors = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleErrors = useCallback(
    (error: unknown) => {
      const errors = toErrorMessage(error);
      setErrors(errors);

      return errors;
    },
    [setErrors],
  );

  const resetErrors = useCallback(() => setErrors([]), [setErrors]);

  return {
    errors,
    resetErrors,
    handleErrors,
  };
};
