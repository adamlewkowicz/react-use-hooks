import * as React from 'react';
import { useLocalStorage } from '.';

interface MyLocalStorage {
  darkMode: boolean
}

describe('useLocalStorage', () => {
  test('', () => {
    function Component() {
      const [storage, setStorage] = useLocalStorage<MyLocalStorage>({ darkMode: true });

      function handleModeToggle() {
        setStorage(storage => ({
          ...storage,
          darkMode: !storage.darkMode 
        }));
      }

      return (
        <div>
          {storage.darkMode ? 'dark' : 'light'}
          <button onClick={handleModeToggle}>
            Toggle mode
          </button>
        </div>
      );
    }

  });
});