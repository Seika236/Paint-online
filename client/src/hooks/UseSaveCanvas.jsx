import { useAtomValue } from "jotai";
import { Canvas } from "@/store/canvasAtom.js";

export function UseSaveCanvas() {
  const canvasElement = useAtomValue(Canvas);
  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExport = () => {
    if (canvasElement) {
      const uri = canvasElement.toDataURL();
      downloadURI(uri, "stage.png");
    }
  };

  return {
    handleExport,
  };
}
