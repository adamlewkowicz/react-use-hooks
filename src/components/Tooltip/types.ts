import { ReactNode, MouseEvent } from "react";

export interface TooltipComponentProps {
  event: MouseEvent<any>
  rect: ComponentRect
}

export interface ContainerProps extends TooltipComponentProps {
  children: ReactNode
}

export type TooltipComponent = (props: TooltipComponentProps) => JSX.Element;

export type ComponentRect = DOMRect | ClientRect;