import * as React from "react";
import { ReactNode, MouseEvent, useState, useMemo } from "react";
import { TooltipComponent, ContainerProps } from "./types";
import { TooltipContext } from "./context";

interface TooltipProviderProps {
  children: ReactNode
  container?: (props: ContainerProps) => React.ReactElement | any
}
export function TooltipProvider({
  children,
  container: Container
}: TooltipProviderProps) {
  const [visible, setVisible] = useState(false);
  const [Component, setComponent] = useState<null | TooltipComponent>(null);
  const [event, setEvent] = useState<null | MouseEvent<any>>(null);
  
  const value = useMemo(() => ({
    visible,
    setVisible,
    Component,
    setComponent
  }), [visible, setVisible, Component, setComponent]);


  function handleMouseMove(event: MouseEvent<any>) {
    setEvent(event);
  }

  return (
    <>
      <TooltipContext.Provider value={value as any}>
        {children}
      </TooltipContext.Provider>
      {visible && (
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