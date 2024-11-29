import { FC, useState } from 'react';
import { useMenu } from '../../hooks/useMenu';
import { Move } from '../../../../icons/Move';
import { MenuItemForm } from './MenuItemForm';
import { MenuItemActions } from './MenuItemActions';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface MenuItemProps {
  id: string;
  name: string;
  url?: string;
  parentId?: string | null;
}

export const MenuItem: FC<MenuItemProps> = ({ id, name, url, parentId }) => {
  const { deleteItem } = useMenu();

  const [isEditing, setIsEditing] = useState(false);
  const [showNestedForm, setShowNestedForm] = useState(false);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id });

  return (
    <>
      <div
        ref={setNodeRef}
        className="flex w-full flex-col items-stretch bg-white px-6 py-4"
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
      >
        {!isEditing ? (
          <>
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
          </>
        ) : (
          <MenuItemForm
            initialValue={{ name, url }}
            onCancel={() => setIsEditing(false)}
            parentId={parentId}
            id={id}
          />
        )}
      </div>

      {showNestedForm && (
        <div className="bg-gray-50 px-6 py-4">
          <MenuItemForm
            onCancel={() => setShowNestedForm(false)}
            parentId={parentId}
          />
        </div>
      )}
    </>
  );
};
