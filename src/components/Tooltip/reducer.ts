import { TooltipComponent } from "./types";
import { MouseEvent } from "react";

export interface TooltipReducerState {
  Component: TooltipComponent | null
  event: MouseEvent<any> | null
  rect: ComponentRect | null
}

export const defaultState: TooltipReducerState = {
  Component: null,
  event: null,
  rect: null
}

export function tooltipReducer(
  state: TooltipReducerState,
  action: TooltipReducerAction
): TooltipReducerState {
  switch(action.type) {
    case 'SHOW_TOOLTIP': return action.payload;
    case 'UPDATE_EVENT': return {
      ...state,
      event: action.payload
    }
    case 'TOOLTIP_HIDE': return {
      ...state,
      Component: null
    }
    default: throw new Error;
  }
}

interface TooltipShow {
  type: 'SHOW_TOOLTIP'
  payload: {
    Component: TooltipComponent
    event: MouseEvent<any>
    rect: ComponentRect
  }
}

interface TooltipHide {
  type: 'TOOLTIP_HIDE'
}

interface UpdateEvent {
  type: 'UPDATE_EVENT'
  payload: MouseEvent<any>
}

type TooltipReducerAction = 
  | TooltipShow
  | TooltipHide
  | UpdateEvent;

type ComponentRect = DOMRect | ClientRect;