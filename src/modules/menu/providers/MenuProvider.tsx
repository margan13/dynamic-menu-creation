'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  url?: string;
  parentId?: string | null;
}

interface MenuContextProps {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>, parentId: string | null) => void;
  editItem: (id: string, updatedItem: Omit<MenuItem, 'id'>) => void;
  deleteItem: (id: string) => void;
  loading: boolean;
}

export const MenuContext = createContext<MenuContextProps | undefined>(
  undefined,
);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedItems = localStorage.getItem('menuItems');
    if (storedItems) setItems(JSON.parse(storedItems));
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(items));
  }, [items]);

  const addItem = (
    item: Omit<MenuItem, 'id'>,
    parentId: string | null = null,
  ) => {
    setItems((prevItems) => [
      ...prevItems,
      { id: (prevItems.length + 1).toString(), parentId, ...item },
    ]);
  };

  const editItem = (id: string, updatedItem: Omit<MenuItem, 'id'>) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== id && item.parentId !== id),
    );
  };

  return (
    <MenuContext.Provider
      value={{ items, addItem, editItem, deleteItem, loading }}
    >
      {children}
    </MenuContext.Provider>
  );
};
