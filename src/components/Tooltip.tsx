import { useState, ReactNode, MouseEvent } from "react";
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


function ComponentWithTooltip() {
  return (
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
  );
}