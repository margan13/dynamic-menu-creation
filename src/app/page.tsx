'use client';

import { useState } from 'react';
import { Menu } from '../modules/menu/components/Menu';
import { MenuItemForm } from '../modules/menu/components/Menu/MenuItemForm';
import { useMenu } from '../modules/menu/hooks/useMenu';
import { Button } from '../components/Button';
import { PlusCircle } from '../icons/PlusCircle';
import { MenuProvider } from '../modules/menu/providers/MenuProvider';

export default function Home() {
  return (
    <MenuProvider>
      <MenuContent />
    </MenuProvider>
  );
}

function MenuContent() {
  const { items } = useMenu();
  const [showForm, setShowForm] = useState(false);

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
}
