'use client';

import { useState } from 'react';

import { Button } from 'src/components/Button';
import { PlusCircle } from 'src/icons/PlusCircle';
import { Menu } from 'src/modules/menu/components/Menu';
import { MenuItemForm } from 'src/modules/menu/components/MenuItem/MenuItemForm';
import { useMenu } from 'src/modules/menu/hooks/useMenu';
import { MenuProvider } from 'src/modules/menu/providers/MenuProvider';

export default function Home() {
  return (
    <MenuProvider>
      <MenuContent />
    </MenuProvider>
  );
}

const MenuContent = () => {
  const { items, loading } = useMenu();
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      {showForm ? (
        <MenuItemForm onCancel={() => setShowForm(false)} />
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-6 rounded-md border border-gray-200 bg-gray-50 p-6">
          <div className="text-center">
            <div className="mb-1 text-base font-semibold text-gray-900">
              Menu jest puste
            </div>
            <div className="text-gray-700">
              W tym menu nie ma jeszcze żadnych linków.
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => setShowForm(true)}
            icon={PlusCircle}
          >
            Dodaj pozycję menu
          </Button>
        </div>
      ) : (
        <Menu items={items} />
      )}
    </>
  );
};
