import { useCallback, useEffect } from "react";
import { useAtomValue } from "jotai";
import { History } from "@/store/drawingAtom.js";
import { SocketAtom } from "@/store/socketAtom.js";
import { UserNameAtom } from "@/store/userAtom.js";
import { UseThrottle } from "@/hooks/UseTrottle.jsx";

export function UseCanvasConnect() {
  const history = useAtomValue(History);
  const userName = useAtomValue(UserNameAtom);
  const socket = useAtomValue(SocketAtom);

  const drawHandler = useCallback(
    (socket, history, userName) => {
      if (socket && socket.readyState === WebSocket.OPEN && userName) {
        socket.send(
          JSON.stringify({
            type: "draw",
            history: history,
            name: userName,
          }),
        );
      }
    },
    [history, userName, socket],
  );

  const drawThrottleHandler = UseThrottle({
    cb: drawHandler,
    delay: 20,
  });
  useEffect(() => {
    drawThrottleHandler(socket, history, userName);
  }, [history]);
}
