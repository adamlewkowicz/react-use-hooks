import * as React from "react";
import { TooltipReducerAction } from "./reducer";

/**
 * @deprecated
 */
interface TooltipContext {
  // Component: TooltipComponent
  // setComponent: (TooltipComponent: React.ReactElement<TooltipComponent> | null) => void
  setComponent(TooltipComponent: React.ReactNode | null): void
  // event: React.MouseEvent<any>
  setEvent<T>(event: React.MouseEvent<T>): void // React.Dispatch<React.SetStateAction<React.MouseEvent<any>>>
  setTargetRect(targetRect: DOMRect | ClientRect): void
}
export const TooltipContext = React.createContext<React.Dispatch<TooltipReducerAction>>(null);