import { atom } from "jotai";

export const IsDrawingAtom = atom(false);
export const ToolValue = atom("pen");
export const ActiveColor = atom("black");
export const History = atom([]);
export const RedoHistory = atom([]);
export const StrokeWidth = atom(5);
