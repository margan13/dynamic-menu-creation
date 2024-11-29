import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateEffect } from 'react-use';
import { object, z } from 'zod';

import { Button } from 'src/components/Button';
import { Form } from 'src/components/Form';
import { useFormSubmit } from 'src/components/Form/hooks/useFormSubmit';
import { InputField } from 'src/components/Input/InputField';
import { SearchInput } from 'src/components/Input/SearchInput';
import { Close } from 'src/icons/Close';
import { Delete } from 'src/icons/Delete';
import { Search } from 'src/icons/Search';
import { useMenu } from 'src/modules/menu/hooks/useMenu';

export interface MenuItemFormModel {
  name: string;
  url?: string;
}

const validationSchema = object({
  name: z.string().min(1, 'Nazwa jest wymagana'),
  url: z.string().nullable(),
});

const defaultValues = {
  name: '',
  url: '',
};

export interface MenuItemFormProps {
  itemId?: string;
  itemParentId?: string | null;
  initialValue?: MenuItemFormModel;
  onCancel?: () => void;
}

export const MenuItemForm: FC<MenuItemFormProps> = ({
  itemId,
  itemParentId = null,
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

  const { addItem, editItem, items } = useMenu();

  const handleSubmit = (data: MenuItemFormModel) => {
    if (itemId) {
      editItem(itemId, data);
    } else {
      addItem(data, itemParentId);
    }

    form.reset(defaultValues);
    onCancel?.();
  };

  const { onSubmit } = useFormSubmit(form, handleSubmit);

  return (
    <div className="flex items-baseline gap-4 rounded-md border border-gray-200 p-6">
      <Form form={form} onSubmit={onSubmit}>
        <InputField name="name" label="Name" placeholder="np. Promocje" />

        <SearchInput
          name="url"
          label="Link"
          prefix={<Search size={16} />}
          placeholder="Wklej lub wyszukaj"
          suggestions={items.map((item) => item.url ?? '')}
          onSelectSuggestion={(url) => form.setValue('url', url || '')}
        />

        <div className="mt-2 flex gap-2">
          <Button onClick={() => form.reset(initialValue)}>Anuluj</Button>
          <Button type="submit" variant="secondary">
            Dodaj
          </Button>
        </div>
      </Form>

      <Button
        onClick={() => {
          form.reset(initialValue);
          onCancel?.();
        }}
        icon={itemId ? Close : Delete}
        borderless
        transparent
      />
    </div>
  );
};
