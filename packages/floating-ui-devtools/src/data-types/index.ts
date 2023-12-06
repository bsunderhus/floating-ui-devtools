import type * as FloatingUI from './FloatingUI';
import type * as FluentUI from './FluentUI';

export type NoData = { type: 'NoData' };
export type MiddlewareData = FloatingUI.MiddlewareData | FluentUI.MiddlewareData;
export type TriggerData = FluentUI.TriggerData;
export type Data = MiddlewareData | TriggerData | NoData;
export type { FloatingUI, FluentUI };
