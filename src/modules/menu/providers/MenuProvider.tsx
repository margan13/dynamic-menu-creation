'use client';

import { createContext, useEffect, useState } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  url?: string;
}

interface MenuContextProps {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  editItem: (id: string, updatedItem: Omit<MenuItem, 'id'>) => void;
  deleteItem: (id: string) => void;
}

export const MenuContext = createContext<MenuContextProps | undefined>(
  undefined,
);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('menuItems');
    if (storedItems) setItems(JSON.parse(storedItems));
  }, []);

  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<MenuItem, 'id'>) => {
    setItems((prevItems) => [
      ...prevItems,
      { id: (prevItems.length + 1).toString(), ...item },
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
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ items, addItem, editItem, deleteItem }}>
      {children}
    </MenuContext.Provider>
  );
};
