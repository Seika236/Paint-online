import { Layer, Line, Rect, Stage, Text } from "react-konva";
import { useEffect, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Canvas, CanvasColor, CanvasSize } from "@/store/canvasAtom.js";
import { ActiveColor, History, ToolValue } from "@/store/drawingAtom.js";
import { MyRect } from "@/components/MyRect.jsx";
import { MyCircle } from "@/components/MyCircle.jsx";
import { UseGetByToolValue } from "@/hooks/UseGetByToolValue.jsx";
import { UsePenDrow } from "@/hooks/UsePenDrow.jsx";
import { UseFigure } from "@/hooks/UseFigure.jsx";

export function MyCanvas() {
  const canvasRef = useRef(null);
  const setCanvas = useSetAtom(Canvas);
  const currentTool = useAtomValue(ToolValue);
  const color = useAtomValue(ActiveColor);
  const [history, setHistory] = useAtom(History);
  const canvasBackgroundColor = useAtomValue(CanvasColor);
  const canvasSize = useAtomValue(CanvasSize);

  useEffect(() => {
    setCanvas(canvasRef.current);
  }, []);
  const {
    selectShape,
    addFigure,
    checkDeselect,
    selectedId,
    ...figureHandlers
  } = UseFigure({ currentTool, color });

  const { handler } = UseGetByToolValue({
    addFigure,
  });

  const drawHandlers = UsePenDrow({ color });

  return (
    <div className={"overflow-clip flex justify-center items-center "}>
      <Stage
        onClick={(event) => {
          handler(
            event.evt.clientX - 50,
            event.evt.clientY - 122,
            history,
            color,
          );
        }}
        className={"border-black border-x-1"}
        width={canvasSize.width}
        height={canvasSize.height}
        ref={canvasRef}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        {...((currentTool === "pen" || currentTool === "eraser") &&
          drawHandlers)}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            fill={canvasBackgroundColor}
            listening={false}
          />
          <Text x={5} y={30} />
          {history.map((figure, i) => {
            if (figure.type === "circle") {
              return (
                <MyCircle
                  key={i}
                  shapeProps={figure}
                  isSelected={figure.id === selectedId}
                  onSelect={() => {
                    selectShape(figure.id);
                  }}
                  onChange={(newAttrs) => {
                    const newFigure = history.slice();
                    newFigure[i] = newAttrs;
                    setHistory(newFigure);
                  }}
                  {...figureHandlers}
                />
              );
            }

            if (figure.type === "square") {
              return (
                <MyRect
                  key={i}
                  shapeProps={figure}
                  isSelected={figure.id === selectedId}
                  onSelect={() => {
                    selectShape(figure.id);
                  }}
                  onChange={(newAttrs) => {
                    const newFigure = history.slice();
                    newFigure[i] = newAttrs;
                    setHistory(newFigure);
                  }}
                  {...figureHandlers}
                />
              );
            }

            if (figure.type === "pen") {
              return (
                <Line
                  key={i}
                  points={figure.points}
                  stroke={figure.color}
                  strokeWidth={figure.strokeWidth}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    figure.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              );
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
}
