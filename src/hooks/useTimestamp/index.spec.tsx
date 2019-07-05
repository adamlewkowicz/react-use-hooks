import "jest-dom/extend-expect";
import * as React from "react";
import { useTimestamp } from ".";
import { render } from "@testing-library/react";

function Component() {
  const timestamp = useTimestamp();
  return (
    <div data-testid="container">
      Current timestamp is: {timestamp}
    </div>
  );
}

jest.useFakeTimers();

test('returns current timestamp', () => {
  const firstTimestamp = 1000;
  const secondTimestamp = 1001;

  jest
    .spyOn(Date, 'now')
    .mockImplementationOnce(() => firstTimestamp * 1000)
    .mockImplementationOnce(() => secondTimestamp * 1000);

  const { getByTestId } = render(<Component />);

  expect(getByTestId('container')).toHaveTextContent(`Current timestamp is: ${firstTimestamp}`);

  jest.advanceTimersByTime(1000);

  expect(Date.now).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(getByTestId('container')).toHaveTextContent(`Current timestamp is: ${secondTimestamp}`);
});