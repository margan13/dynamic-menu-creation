import { FC } from 'react';
import { useUpdateEffect } from 'react-use';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, z } from 'zod';
import { Form } from '../../../../components/Form';
import { InputField } from '../../../../components/Input/InputField';
import { Button } from '../../../../components/Button';
import { Delete } from '../../../../icons/Delete';
import { useMenu } from '../../hooks/useMenu';
import { useFormSubmit } from '../../../../components/Form/hooks/useFormSubmit';

export interface MenuItemFormModel {
  name: string;
  url?: string;
}

const validationSchema = object({
  name: z.string(),
  url: z.string().nullable(),
});

const defaultValues = {
  name: '',
  url: '',
};

export interface MenuItemFormProps {
  initialValue?: MenuItemFormModel;
  onCancel: () => void;
}

export const MenuItemForm: FC<MenuItemFormProps> = ({
  initialValue,
  onCancel,
}) => {
  const form = useForm<MenuItemFormModel>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValue ?? defaultValues,
  });

  useUpdateEffect(() => {
    form.reset(initialValue);
  }, [initialValue]);

  const { addItem } = useMenu();

  const handleSubmit = (data: MenuItemFormModel) => {
    addItem(data);
    form.reset(defaultValues);
    onCancel();
  };

  const { onSubmit } = useFormSubmit(form, handleSubmit);

  return (
    <div className="flex gap-4 rounded-md border border-gray-200 p-6">
      <Form form={form} onSubmit={onSubmit}>
        <InputField name="name" label="Name" placeholder="np. Promocje" />

        <InputField name="url" label="Link" placeholder="Wklej lub wyszukaj" />

        <div className="mt-2 flex gap-2">
          <Button onClick={() => form.reset(defaultValues)}>Anuluj</Button>
          <Button type="submit" variant="secondary">
            Dodaj
          </Button>
        </div>
      </Form>

      <Button
        onClick={() => {
          form.reset(initialValue);
          onCancel();
        }}
        icon={Delete}
        borderless
        transparent
      />
    </div>
  );
};
