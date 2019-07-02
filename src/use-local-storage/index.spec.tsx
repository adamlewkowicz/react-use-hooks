import * as React from 'react';
import { useLocalStorage } from '.';
import { render, fireEvent } from '@testing-library/react';

interface MyLocalStorage {
  darkMode: boolean
}

describe('useLocalStorage', () => {
  test('saves updated data in local storage', async () => {
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
    expect(localStorage.__STORE__.darkMode).toEqual("false");
    /* Create useStateDiff for not overusing setItem method */
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);

    await fireEvent.click(button);

    getByText('dark');
    expect(localStorage.__STORE__.darkMode).toEqual("true");
  });
});