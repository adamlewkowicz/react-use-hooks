import { TooltipComponent } from "./types";
import { useContext, MouseEvent } from "react";
import { TooltipContext } from "./context";

export function useTooltip<T extends HTMLElement>(
  TooltipComponent: TooltipComponent
) {
  const { setComponent, setEvent, setTargetRect } = useContext(TooltipContext);

  function handleMouseOver(event: MouseEvent<T>) {
    setEvent<T>(event);
    setTargetRect(event.currentTarget.getBoundingClientRect());
    setComponent(TooltipComponent);
  }

  function handleMouseOut() {
    setComponent(null);
  }

  function handleMouseMove(event: MouseEvent<T>) {
    setEvent<T>(event);
  }

  return {
    onMouseEnter: handleMouseOver,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseOut
  }
}