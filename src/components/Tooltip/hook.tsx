import { TooltipComponent } from "./types";
import { useContext, MouseEvent } from "react";
import { TooltipContext } from "./context";

export function useTooltip<T extends HTMLElement>(
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