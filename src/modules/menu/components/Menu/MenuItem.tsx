import { FC } from 'react';
import { useMenu } from '../../hooks/useMenu';
import { Button } from '../../../../components/Button';
import { Move } from '../../../../icons/Move';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface MenuItemProps {
  id: string;
  name: string;
  url?: string;
}

export const MenuItem: FC<MenuItemProps> = ({ id, name, url }) => {
  const { deleteItem } = useMenu();
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      className="flex w-full items-center justify-between bg-white px-6 py-4"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex items-center gap-3 text-gray-700">
        <Move {...listeners} {...attributes} />

        <div>
          <div className="font-bold text-gray-900">{name}</div>
          <div>{url}</div>
        </div>
      </div>
      <div className="flex">
        <Button
          className="!rounded-none !rounded-l-md"
          onClick={() => deleteItem(id)}
        >
          Usuń
        </Button>

        <Button className="!rounded-none !border-x-0">Edytuj</Button>

        <Button className="!rounded-none !rounded-r-md">
          Dodaj pozycję menu
        </Button>
      </div>
    </div>
  );
};
