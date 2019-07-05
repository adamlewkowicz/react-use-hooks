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
  Component: ReactNode
  setComponent: () => ReactNode
}
const TooltipContext = createContext(null);

interface TooltipProviderProps {
  children: ReactNode
  container?: typeof React.Component
}
function TooltipProvider({
  children,
  container: Container
}: TooltipProviderProps) {
  const [visible, setVisible] = useState(false);
  const [Component, setComponent] = useState(null);
  
  const value = useMemo(() => ({
    visible,
    setVisible,
    Component, setComponent
  }), [visible, setVisible, Component, setComponent]);


  return (
    <>
      <TooltipContext.Provider value={value}>
        {children}
      </TooltipContext.Provider>
      {visible && (
        Container ? (
          <Container children={<Component />} />
        ) : (
          <Component />
        )
      )}
    </>
  );
}


function App() {
  return (
    <TooltipProvider
      
    >
      <div {...useTooltip(({ screenX, screenY }) =>
        <TooltipContainer
          screenX={screenX}
          screenY={screenY}
        >
          <p>Tooltip details</p>
          <div>
            You can place everything in it's content
          </div>
        </TooltipContainer>
      )}>
        If you hover me, you gonna see the tooltip.
      </div>
    </TooltipProvider>
  );
}