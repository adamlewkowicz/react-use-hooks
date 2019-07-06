import * as React from "react";
import { ReactNode, useReducer } from "react";
import { TooltipContext } from "./context";
import { TooltipContainer, TooltipContainerOptions } from "./TooltipContainer";
import { tooltipReducer, defaultState } from "./reducer";

interface TooltipProviderProps extends TooltipContainerOptions {
  children: ReactNode
  container?: TooltipContainer
}
export function TooltipProvider({
  children,
  container: Container = TooltipContainer,
  ...containerOptions
}: TooltipProviderProps) {
  const [state, dispatch] = useReducer(tooltipReducer, defaultState);
  const { Component, event, rect } = state;
  
  return (
    <>
      <TooltipContext.Provider value={dispatch}>
        {children}
      </TooltipContext.Provider>
      {Component && (
        <Container
          {...containerOptions}
          rect={rect}
          event={event}
        >
          <Component event={event} />
        </Container>
      )}
    </>
  );
}