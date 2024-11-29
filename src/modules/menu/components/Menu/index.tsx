'use client';

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
import { FC, useEffect, useState } from 'react';

import { Button } from 'src/components/Button';
import { MenuItem } from 'src/modules/menu/components/MenuItem';
import { MenuItemForm } from 'src/modules/menu/components/MenuItem/MenuItemForm';
import { MenuItem as IMenuItem } from 'src/modules/menu/providers/MenuProvider';
import { cn } from 'src/utils';

export interface MenuProps {
  items: IMenuItem[];
}

export const Menu: FC<MenuProps> = ({ items }) => {
  const [showForm, setShowForm] = useState(false);
  const [menuItems, setMenuItems] = useState(items);

  useEffect(() => {
    setMenuItems(items);
  }, [items]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const oldIndex = menuItems.findIndex((item) => item.id === active.id);
      const newIndex = menuItems.findIndex((item) => item.id === over.id);

      if (oldIndex !== newIndex) {
        const updatedItems = arrayMove(menuItems, oldIndex, newIndex);
        setMenuItems(updatedItems);

        localStorage.setItem('menuItems', JSON.stringify(updatedItems));
      }
    }
  };

  const renderItems = (items: IMenuItem[], parentId: string | null = null) =>
    items
      .filter((item) => item.parentId ?? null === parentId)
      .map((item) => (
        <div key={item.id} className={cn(parentId ? 'ml-16' : '')}>
          <MenuItem
            id={item.id}
            name={item.name}
            url={item.url}
            parentId={item.parentId}
          />
          {renderItems(items, item.id)}
        </div>
      ));

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="overflow-hidden rounded-md border">
        <SortableContext
          items={menuItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="divide-y divide-gray-200">
            {renderItems(menuItems)}
          </div>
        </SortableContext>

        {showForm && (
          <div className="bg-gray-50 px-6 py-4">
            <MenuItemForm onCancel={() => setShowForm(false)} />
          </div>
        )}

        <div className="bg-gray-100 px-6 py-5">
          <Button onClick={() => setShowForm(true)}>Dodaj pozycję menu</Button>
        </div>
      </div>
    </DndContext>
  );
};
