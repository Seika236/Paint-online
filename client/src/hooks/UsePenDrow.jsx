import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  History,
  IsDrawingAtom,
  RedoHistory,
  StrokeWidth,
  ToolValue,
} from "@/store/drawingAtom.js";

export function UsePenDrow({ color }) {
  const tool = useAtomValue(ToolValue);
  const [history, setHistory] = useAtom(History);
  const [isDrawing, setIsDrawing] = useAtom(IsDrawingAtom);
  const setRedoHistory = useSetAtom(RedoHistory);
  const strokeWidth = useAtomValue(StrokeWidth);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setHistory([
      ...history,
      {
        tool,
        points: [pos.x, pos.y],
        color,
        type: "pen",
        strokeWidth: strokeWidth,
      },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = history[history.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    history.splice(history.length - 1, 1, lastLine);
    setHistory(history.concat());
  };

  const handleMouseup = () => {
    setRedoHistory([]);
    setIsDrawing(false);
  };

  return {
    onMouseDown: handleMouseDown,
    onMousemove: handleMouseMove,
    onMouseup: handleMouseup,
  };
}
