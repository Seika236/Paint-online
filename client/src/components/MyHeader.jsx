import { Button } from "@/components/ui/button.tsx";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input.js";
import {
  Circle,
  CornerUpLeft,
  CornerUpRight,
  Eraser,
  Pen,
  Save,
  Square,
} from "lucide-react";
import { UseSaveCanvas } from "@/hooks/UseSaveCanvas.jsx";
import { UseHeaderButtonHandlers } from "@/hooks/UseHeaderButtonHandlers.jsx";
import { useAtom, useSetAtom } from "jotai";
import {
  ActiveColor,
  History,
  RedoHistory,
  StrokeWidth,
} from "@/store/drawingAtom.js";
import { CanvasColor, CanvasSize } from "@/store/canvasAtom.js";
import { useState } from "react";

export function MyHeader() {
  const { handleExport } = UseSaveCanvas();
  const setColor = useSetAtom(ActiveColor);
  const setCanvasColor = useSetAtom(CanvasColor);
  const setHistory = useSetAtom(History);
  const [redoHistory, setRedoHistory] = useAtom(RedoHistory);
  const [value, setValue] = useState([5]);
  const setStrokeWidth = useSetAtom(StrokeWidth);
  const [canvasSize, setCanvasSize] = useAtom(CanvasSize);

  const setStrokeWidthHandler = (value) => {
    setStrokeWidth(value);
    setValue(value);
  };

  const onChangeCanvasWidth = (event) => {
    const value = +event.target.value;
    setCanvasSize((prevState) => ({
      ...prevState,
      width: value > 3000 ? 3000 : value < 0 ? 0 : value,
    }));
  };

  const onChangeCanvasHeigth = (event) => {
    const value = +event.target.value;
    setCanvasSize((prevState) => ({
      ...prevState,
      height: value > 3000 ? 3000 : value < 0 ? 0 : value,
    }));
  };

  const {
    onSquareButtonClick,
    onCircleButtonClick,
    onPenButtonClick,
    onEraserButtonClick,
  } = UseHeaderButtonHandlers();

  const onChangeDrawColor = (event) => {
    setColor(event.target.value);
  };

  const onChangeCanvasColor = (event) => {
    setCanvasColor(event.target.value);
  };

  const onRedoClick = () => {
    if (redoHistory.length > 0) {
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        const lastRedoHistory = redoHistory.pop();
        newHistory.push(lastRedoHistory);
        return newHistory;
      });
      return;
    }
    alert("конец");
  };

  const onUndoClick = () => {
    setHistory((prevState) => {
      if (prevState.length === 0) return [];
      const newHistory = [...prevState];
      const lastHistory = newHistory.pop();
      setRedoHistory((prevState) => [...prevState, lastHistory]);
      return newHistory;
    });
  };

  return (
    <div className={"flex gap-x-2 p-4 items-center"}>
      <Button onClick={onSquareButtonClick} size={"lg"} variant={"outline"}>
        <Square color={"green"} />
      </Button>
      <Button onClick={onCircleButtonClick} size={"lg"}>
        <Circle />
      </Button>
      <Button onClick={onEraserButtonClick} size={"lg"} variant={"outline"}>
        <Eraser color={"red"} />
      </Button>

      <div className={"w-13 h-10 bg-black rounded-[10px]"}>
        <Input
          onChange={onChangeDrawColor}
          type={"color"}
          className={"h-full"}
        />
      </div>
      <div className={"w-13 h-10"}>
        <Input
          onChange={onChangeCanvasColor}
          type={"color"}
          className={"h-full"}
        />
      </div>
      <Button onClick={onPenButtonClick} size={"lg"}>
        <Pen />
      </Button>
      <div className={"w-25 flex gap-x-3 "}>
        <Slider
          onValueChange={setStrokeWidthHandler}
          defaultValue={value}
          min={1}
          max={100}
          step={1}
        />
        {value[0]}
      </div>

      <div className={" h-10 flex gap-x-3 items-center"}>
        <Input
          min={0}
          max={3000}
          value={canvasSize.width}
          onChange={onChangeCanvasWidth}
          type={"number"}
          className={"h-full"}
        />
        <div>W</div>:<div>H</div>
        <Input
          min={0}
          max={3000}
          value={canvasSize.height}
          onChange={onChangeCanvasHeigth}
          type={"number"}
          className={"h-full"}
        />
      </div>

      <div className={"flex ml-auto gap-x-1"}>
        <Button onClick={onUndoClick}>
          <CornerUpLeft />
        </Button>
        <Button onClick={onRedoClick}>
          <CornerUpRight />
        </Button>
        <Button onClick={handleExport}>
          <Save />
        </Button>
      </div>
    </div>
  );
}
