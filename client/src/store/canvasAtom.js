import { atom } from "jotai";

export const Canvas = atom(null);
export const CanvasColor = atom("white");
export const CanvasSize = atom({ width: 1000, height: 1000 });
