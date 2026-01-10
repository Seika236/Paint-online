import { useSetAtom } from "jotai";
import { UserNameAtom } from "@/store/userAtom.js";

export function UseCanvasPage() {
  const setUserName = useSetAtom(UserNameAtom);
  const setConnect = (socket, params, name) => {
    if (socket && socket.readyState === WebSocket.OPEN && name) {
      setUserName(name);
      socket.send(
        JSON.stringify({
          name: name,
          id: params.id,
          type: "connection",
        }),
      );
    }
  };

  return {
    setConnect,
  };
}
