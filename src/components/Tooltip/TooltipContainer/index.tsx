import { ReactNode, MouseEvent } from "react";
import css from "./style.scss";

export interface TooltipContainerOptions {
  /** Determines whether tooltip's position should be static, or it should after the mouse.
   * @default true
   */
  floating?: boolean
  /**
   * Position of the tooltip.
   * @default 'top'
   */
  position?: 'top' | 'right' | 'bottom' | 'left'
  /**
   * Margin from mouse position.
   * @default 10
   */
  margin?: number
  /** Class applied to tooltip container. */
  className?: string
}

interface TooltipContainerProps extends TooltipContainerOptions {
  children: ReactNode
  event: MouseEvent<any>
  rect: DOMRect | ClientRect
}
export function TooltipContainer({
  floating = true,
  position = 'top',
  margin = 10,
  className,
  event,
  rect,
  children
}: TooltipContainerProps) {
  return (
    <div
      className={[css.container, className].join(' ')}
      style={{
        left: event.clientX + margin,
        top: event.clientY + margin
      }}
    >
      {children}
    </div>
  );
}

export type TooltipContainer = typeof TooltipContainer;