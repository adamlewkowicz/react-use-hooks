import * as React from "react";
import { useState, ReactNode, MouseEvent, useContext, createContext, useMemo } from "react";
import * as ReactDOM from "react-dom";

const tooltipRoot = document.getElementById('tooltip');
const tooltipEl = document.createElement('div');


export function useTooltip<T extends HTMLElement>(
  getComponent: (event: MouseEvent<T>) => ReactNode
) {
  const [Component, setComponent] = useState(getComponent);

  function handleMouseOver(event: MouseEvent<T>) {
    tooltipRoot.appendChild(tooltipEl);
    setComponent(getComponent(event));
  }

  function handleMouseOut() {
    tooltipRoot.removeChild(tooltipEl);
  }

  ReactDOM.createPortal(
    Component,
    tooltipEl
  );

  return {
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut
  }
}

function TooltipContainer({ children }: any) {
  return (
    <div>
      {children}
    </div>
  );
}


interface TooltipContext {
  visible: boolean
  setVisible: () => boolean
  Component: TooltipComponent
  setComponent: () => TooltipComponent
}
const TooltipContext = React.createContext<TooltipContext>(null);


// interface ContainerPlaceholderProps {
//   event: MouseEvent<any>
//   children: ReactNode
// }
// function ContainerPlaceholder(props: ContainerPlaceholderProps) {
//   return props.children;
// }
interface ContainerProps {
  children: ReactNode
  event: MouseEvent<any>
}

interface TooltipComponentProps {
  event: MouseEvent<any>
}

type TooltipComponent = (props: TooltipComponentProps) => React.ReactElement


interface TooltipProviderProps {
  children: ReactNode
  container?: (props: ContainerProps) => React.ReactElement | any
}
function TooltipProvider({
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


export function useTooltip_<T extends HTMLElement>(
  TooltipComponent: TooltipComponent
  // tooltipComponent: (event: MouseEvent<T>) => TooltipComponent
) {
  const { setComponent } = useContext(TooltipContext);

  function handleMouseOver(event: MouseEvent<T>) {
    setComponent(
      // <tooltipComponent

      // />
    );
  }

  function handleMouseOut() {
  }

  return (
    <TooltipComponent />
  )

  return {
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut
  }
}

function App() {
  return (
    <TooltipProvider
      container={({ children, event }) => (
        <div
          className="tooltip-container"
          style={{
            left: event.clientX,
            right: event.clientY
          }}
        >
          {children}
        </div>
      )}
    >
      <div {...useTooltip_(({ event }) => (
        <> 
          <p>Tooltip details</p>
          <div>
            You can place everything in it's content
          </div>
        </>
      ))}>
        If you hover me, you gonna see the tooltip.
      </div>
    </TooltipProvider>
  );
}