import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC, useState } from 'react';

import { Move } from 'src/icons/Move';
import { MenuItemActions } from 'src/modules/menu/components/MenuItem/MenuItemActions';
import { MenuItemForm } from 'src/modules/menu/components/MenuItem/MenuItemForm';
import { useMenu } from 'src/modules/menu/hooks/useMenu';
import { cn } from 'src/utils';

export interface MenuItemProps {
  id: string;
  name: string;
  url?: string;
  parentId?: string | null;
  className?: string;
}

export const MenuItem: FC<MenuItemProps> = ({
  id,
  name,
  url,
  parentId,
  className,
}) => {
  const { deleteItem } = useMenu();

  const [isEditing, setIsEditing] = useState(false);
  const [showNestedForm, setShowNestedForm] = useState(false);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id });

  return (
    <>
      <div
        ref={setNodeRef}
        className={cn(
          'flex w-full flex-col items-stretch bg-white px-6 py-4',
          className,
        )}
        style={{ transform: CSS.Transform.toString(transform), transition }}
      >
        {!isEditing ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-700">
              <Move {...listeners} {...attributes} />
              <div>
                <div className="font-bold text-gray-900">{name}</div>
                <div>{url}</div>
              </div>
            </div>

            <MenuItemActions
              onAddNew={() => setShowNestedForm(true)}
              onDelete={() => deleteItem(id)}
              onEdit={() => setIsEditing(true)}
            />
          </div>
        ) : (
          <MenuItemForm
            itemId={id}
            itemParentId={parentId}
            initialValue={{ name, url }}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>

      {showNestedForm && (
        <div className="bg-gray-50 px-6 py-4">
          <MenuItemForm
            itemParentId={id}
            onCancel={() => setShowNestedForm(false)}
          />
        </div>
      )}
    </>
  );
};
