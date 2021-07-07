import { TooltipComponent } from "./types";
import { useContext, MouseEvent } from "react";
import { TooltipContext } from "./context";

export function useTooltip<T extends HTMLElement>(
  TooltipComponent: TooltipComponent
) {
  const dispatch = useContext(TooltipContext);

  function handleMouseEnter(event: MouseEvent<T>) {
    dispatch({
      type: 'SHOW_TOOLTIP',
      payload: {
        Component: TooltipComponent,
        rect: event.currentTarget.getBoundingClientRect(),
        event
      }
    });
  }

  function handleMouseMove(event: MouseEvent<T>) {
    dispatch({
      type: 'UPDATE_EVENT',
      payload: event
    });
  }

  function handleMouseLeave() {
    dispatch({ type: 'HIDE_TOOLTIP' });
  }

  return {
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  }
}