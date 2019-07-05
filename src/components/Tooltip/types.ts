import { ReactNode, MouseEvent } from "react";

export interface ContainerProps {
  children: ReactNode
  event: React.MouseEvent<any>
}

export interface TooltipComponentProps {
  event: MouseEvent<any>
}

export type TooltipComponent = (props: TooltipComponentProps) => JSX.Element;