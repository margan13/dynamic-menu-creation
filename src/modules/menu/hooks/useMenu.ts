import { useContext } from 'react';

import { MenuContext } from 'src/modules/menu/providers/MenuProvider';

export const useMenu = () => {
  const context = useContext(MenuContext);

  if (!context) throw new Error('useMenu must be used within a MenuProvider');

  return context;
};
