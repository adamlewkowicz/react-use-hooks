import * as React from "react";
import { TooltipComponent } from "./types";

interface TooltipContext {
  visible: boolean
  setVisible: () => React.Dispatch<React.SetStateAction<boolean>>
  Component: TooltipComponent
  // setComponent: (TooltipComponent: React.ReactElement<TooltipComponent> | null) => void
  setComponent: (TooltipComponent: React.ReactNode | null) => void
  event: React.MouseEvent<any>
  setEvent: React.Dispatch<React.SetStateAction<React.MouseEvent<any>>>
}
export const TooltipContext = React.createContext<TooltipContext>(null);