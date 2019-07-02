import * as React from 'react';
import { useLocalStorage } from '.';
import { render, fireEvent } from '@testing-library/react';


describe('useLocalStorage', () => {

  test('saves updated data in local storage', async () => {
    const PROP_NAME = 'darkMode';

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
    expect(localStorage.__STORE__[PROP_NAME]).toEqual("false");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(PROP_NAME, "false");

    await fireEvent.click(button);

    getByText('dark');
    expect(localStorage.__STORE__[PROP_NAME]).toEqual("true");
    expect(localStorage.setItem).toHaveBeenLastCalledWith(PROP_NAME, "true");
  });
  
});

interface MyLocalStorage {
  darkMode: boolean
}