import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { History, RedoHistory } from "@/store/drawingAtom.js";

export function UseFigure({ currentTool }) {
  const [selectedId, selectShape] = useState(null);
  const [history, setHistory] = useAtom(History);
  const setRedoHistory = useSetAtom(RedoHistory);

  const onDragStart = (e, id) => {};

  const onDragEnd = (e, id) => {
    const itemsCopy = history.slice();
    const item = history.find((i) => i.id === id);
    const index = history.indexOf(item);

    itemsCopy[index] = {
      ...item,
      x: e.target.x(),
      y: e.target.y(),
    };

    setRedoHistory([]);
    setHistory(itemsCopy);
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const addFigure = (x, y, figures, color) => {
    const newFigure = {
      x: currentTool === "circle" ? x + 52 : x,
      y: currentTool === "circle" ? y + 52 : y,
      width: 100,
      height: 100,
      fill: color,
      id: 0,
      type: currentTool,
    };
    if (figures.length) {
      newFigure.id = figures.at(-1).id + 1;
    }
    setRedoHistory([]);
    setHistory((prevState) => [...prevState, newFigure]);
  };

  return {
    selectedId,
    checkDeselect,
    selectShape,
    addFigure,
    onDragStart,
    onDragEnd,
  };
}
