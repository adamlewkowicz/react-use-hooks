import * as React from 'react';
import { useLocalStorage } from '.';
import { render, fireEvent } from '@testing-library/react';

interface MyLocalStorage {
  darkMode: boolean
}

describe('useLocalStorage', () => {
  test('', async () => {
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
    
    const { getByText } = render(<Component />);

    getByText('dark');

    const button = getByText('Toggle mode');

    await fireEvent.click(button);

    getByText('light');

    expect(localStorage.__STORE__).toStrictEqual({ darkMode: false });
    /* Create useStateDiff for not overusing setItem method */
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});