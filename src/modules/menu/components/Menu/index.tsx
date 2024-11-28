'use client';

import { FC, useState } from 'react';
import { Button } from '../../../../components/Button';
import { MenuItem } from './MenuItem';
import { MenuItemForm } from './MenuItemForm';
import { MenuItem as IMenuItem } from '../../providers/MenuProvider';

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export interface MenuProps {
  items: IMenuItem[];
}

export const Menu: FC<MenuProps> = ({ items }) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [menuItems, setMenuItems] = useState(items);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const oldIndex = menuItems.findIndex((item) => item.id === active.id);
      const newIndex = menuItems.findIndex((item) => item.id === over.id);
      if (oldIndex !== newIndex) {
        const updatedItems = arrayMove(menuItems, oldIndex, newIndex);
        setMenuItems(updatedItems);
      }
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="overflow-hidden rounded-md border">
        <SortableContext
          items={menuItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="divide-y divide-gray-200">
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                id={item.id}
                name={item.name}
                url={item.url}
              />
            ))}
          </div>
        </SortableContext>

        {displayForm && (
          <div className="bg-gray-50 px-6 py-4">
            <MenuItemForm onCancel={() => setDisplayForm(false)} />
          </div>
        )}

        <div className="bg-gray-100 px-6 py-5">
          <Button onClick={() => setDisplayForm(true)}>
            Dodaj pozycję menu
          </Button>
        </div>
      </div>
    </DndContext>
  );
};
