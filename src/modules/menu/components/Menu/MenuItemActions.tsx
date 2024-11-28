import { Button } from '../../../../components/Button';
import { FC } from 'react';

export interface MenuItemActionsProps {
  onAddNew: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const MenuItemActions: FC<MenuItemActionsProps> = ({
  onAddNew,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="flex">
      <Button className="!rounded-none !rounded-l-md" onClick={onDelete}>
        Usuń
      </Button>

      <Button className="!rounded-none !border-x-0" onClick={onEdit}>
        Edytuj
      </Button>

      <Button className="!rounded-none !rounded-r-md" onClick={onAddNew}>
        Dodaj pozycję menu
      </Button>
    </div>
  );
};
