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
  const [targetRect, setTargetRect] = useState<null | DOMRect | ClientRect>(null);
  
  const value = useMemo(() => ({
    setComponent,
    setEvent,
    setTargetRect
  }), [setComponent, setEvent, setTargetRect]);

  return (
    <>
      <TooltipContext.Provider value={value}>
        {children}
      </TooltipContext.Provider>
      {Component && (
        <Container
          {...containerOptions}
          rect={targetRect}
          event={event}
        >
          <Component event={event} />
        </Container>
      )}
    </>
  );
}