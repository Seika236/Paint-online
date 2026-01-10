import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { ToolValue } from "@/store/drawingAtom.js";

export function UseGetByToolValue({ addFigure }) {
  const [handler, setHandler] = useState(() => () => {});
  const currentTool = useAtomValue(ToolValue);

  useEffect(() => {
    switch (currentTool) {
      case "square":
        setHandler(() => addFigure);
        break;
      case "circle":
        setHandler(() => addFigure);
        break;
    }

    return () => {
      setHandler(() => () => {});
    };
  }, [currentTool]);

  return {
    handler,
  };
}
