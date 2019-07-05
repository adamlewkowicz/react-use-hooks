import * as React from "react";
import { ReactNode, MouseEvent, useState, useMemo } from "react";
import { TooltipComponent } from "./types";
import { TooltipContext } from "./context";
import { TooltipContainer, TooltipContainerOptions } from "./TooltipContainer";

interface TooltipProviderProps extends TooltipContainerOptions {
  children: ReactNode
  container?: TooltipContainer
}
export function TooltipProvider({
  children,
  container: Container = TooltipContainer,
  ...containerOptions
}: TooltipProviderProps) {
  const [Component, setComponent] = useState<null | TooltipComponent>(null);
  const [event, setEvent] = useState<null | MouseEvent<any>>(null);
  
  const value = useMemo(() => ({
    Component,
    setComponent,
    event,
    setEvent
  }), [Component, setComponent, event, setEvent]);

  return (
    <>
      <TooltipContext.Provider value={value}>
        {children}
      </TooltipContext.Provider>
      {Component && (
        <Container
          {...containerOptions}
          event={event}
        >
          <Component event={event} />
        </Container>
      )}
    </>
  );
}