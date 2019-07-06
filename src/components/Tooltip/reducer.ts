import { TooltipComponent, ComponentRect } from "./types";
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
    case 'HIDE_TOOLTIP': return {
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
  type: 'HIDE_TOOLTIP'
}

interface UpdateEvent {
  type: 'UPDATE_EVENT'
  payload: MouseEvent<any>
}

export type TooltipReducerAction = 
  | TooltipShow
  | TooltipHide
  | UpdateEvent;