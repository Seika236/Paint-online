import { useSetAtom } from "jotai";
import { ToolValue } from "@/store/drawingAtom.js";

export function UseHeaderButtonHandlers() {
  const setToolValue = useSetAtom(ToolValue);

  const onSquareButtonClick = () => {
    setToolValue("square");
  };

  const onCircleButtonClick = () => {
    setToolValue("circle");
  };

  const onPenButtonClick = () => {
    setToolValue("pen");
  };

  const onEraserButtonClick = () => {
    setToolValue("eraser");
  };

  return {
    onSquareButtonClick,
    onCircleButtonClick,
    onPenButtonClick,
    onEraserButtonClick,
  };
}
