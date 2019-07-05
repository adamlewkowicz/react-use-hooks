import { TooltipComponent } from "./types";
import { useContext, MouseEvent } from "react";
import { TooltipContext } from "./context";

export function useTooltip<T extends HTMLElement>(
  TooltipComponent: TooltipComponent
) {
  const { setComponent, setEvent, setTargetRect } = useContext(TooltipContext);

  function handleMouseEnter(event: MouseEvent<T>) {
    setEvent<T>(event);
    setTargetRect(event.currentTarget.getBoundingClientRect());
    setComponent(TooltipComponent);
  }

  function handleMouseMove(event: MouseEvent<T>) {
    setEvent<T>(event);
  }

  function handleMouseLeave() {
    setComponent(null);
  }

  return {
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  }
}