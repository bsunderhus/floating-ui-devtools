import type * as FloatingUI from './FloatingUI';
import type * as FluentUI from './FluentUI';

export type MiddlewareData = FloatingUI.MiddlewareData | FluentUI.MiddlewareData;
export type TriggerData = FluentUI.TriggerData;
export type Data = MiddlewareData | TriggerData;
export type { FloatingUI, FluentUI };
