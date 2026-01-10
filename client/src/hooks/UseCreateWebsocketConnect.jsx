import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { SocketAtom } from "@/store/socketAtom.js";
import { WebsocketCanvasService } from "@/services/WebsocketCanvasService.js";
import { History } from "@/store/drawingAtom.js";
import { NameDialogAtom } from "@/store/dialogAtom.js";

export function UseCreateWebsocketConnect() {
  const [socket, setSocket] = useAtom(SocketAtom);
  const [history, setHistory] = useAtom(History);
  const [isVisibleDialog, setIsVisibleDialog] = useAtom(NameDialogAtom);

  const updateHistory = useCallback(() => {
    return WebsocketCanvasService.updateHistory(socket, history);
  }, [history]);

  useEffect(() => {
    if (!socket) {
      setSocket(new WebSocket("ws://localhost:3000"));
      return;
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const actions = {
        connection: () =>
          WebsocketCanvasService.userConnection(
            data,
            isVisibleDialog,
            setIsVisibleDialog,
          ),
        draw: () => WebsocketCanvasService.changeDrawHistory(data, setHistory),
        badname: () => WebsocketCanvasService.badName(),
        update: () => updateHistory(),
        fullUpdate: () =>
          WebsocketCanvasService.fullUpdateHistory(data.history, setHistory),
      };

      actions[data.type]();
    };
  }, [socket, updateHistory]);
}
