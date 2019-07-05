import * as React from "react";
import { TooltipComponent } from "./types";

interface TooltipContext {
  visible: boolean
  setVisible: () => boolean
  Component: TooltipComponent
  setComponent: () => TooltipComponent
}
export const TooltipContext = React.createContext<TooltipContext>(null);