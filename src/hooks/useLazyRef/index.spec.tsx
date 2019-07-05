import * as React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { useLazyRef } from ".";

test('does not create new instance on re-renders', () => {
  const mockInstance = new AbortController();
  const mockValue = jest.fn().mockImplementationOnce(() => mockInstance);

  const { result, rerender } = renderHook(() => useLazyRef(mockValue));

  rerender();

  expect(result.current.current).toBe(mockInstance);
});