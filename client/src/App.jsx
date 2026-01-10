import { Route, Routes } from "react-router";
import { CanvasPage } from "@/pages/CanvasPage.jsx";
import { UseCreateWebsocketConnect } from "@/hooks/UseCreateWebsocketConnect.jsx";
import { UseCanvasConnect } from "@/hooks/UseCanvasConnect.jsx";

function App() {
  UseCreateWebsocketConnect();
  UseCanvasConnect();
  return (
    <Routes>
      <Route path={"/:id"} element={<CanvasPage />} />
      <Route path="*" element={<CanvasPage />} />
    </Routes>
  );
}

export default App;
