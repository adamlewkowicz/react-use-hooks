import "jest-dom/extend-expect";
import * as React from "react";
import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { usePrevState } from ".";

const mockModule = {
  usePrevState
}

function Component({ initial }) {
  const [counter, setCounter] = useState(initial);
  const prevCounter = mockModule.usePrevState(counter);
  return (
    <>
      <p>Counter: {counter}</p>
      <button
        data-testid="inc-btn"
        onClick={() => setCounter(prev => prev + 1)}
      >
        Increment
      </button>
    </>
  );
}

test('stores previous state and updates only on change', () => {
  const initialVal = 0;
  const nextVal = 1;
  const spy = jest.spyOn(mockModule, 'usePrevState');

  const { getByTestId, container } = render(
    <Component
      initial={initialVal}
    />
  );
  const button = getByTestId('inc-btn');

  fireEvent.click(button);

  expect(container).toHaveTextContent(`Counter: ${nextVal}`);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveReturnedWith(initialVal);
  expect(spy).not.toHaveReturnedWith(nextVal);
});