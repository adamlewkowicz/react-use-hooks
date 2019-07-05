import * as React from "react";
import { ReactNode, MouseEvent, useState, useMemo } from "react";
import { TooltipComponent, ContainerProps } from "./types";
import { TooltipContext } from "./context";

interface TooltipProviderProps {
  children: ReactNode
  container?: (props: ContainerProps) => React.ReactElement
}
export function TooltipProvider({
  children,
  container: Container
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
        Container ? (
          <Container event={event}>
            <Component event={event} />
          </Container>
        ) : (
          <Component event={event} />
        )
      )}
    </>
  );
}