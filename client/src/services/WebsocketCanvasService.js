export class WebsocketCanvasService {
  static userConnection(data, isVisibleDialog, setIsVisibleDialog) {
    if (isVisibleDialog) {
      setIsVisibleDialog(false);
    }
  }

  static fullUpdateHistory(history, setHistory) {
    setHistory(history);
  }

  static updateHistory(socket, history) {
    socket.send(
      JSON.stringify({
        type: "update",
        history: history,
      }),
    );
  }

  static changeDrawHistory(data, setHistory) {
    setHistory(data.history);
  }

  static badName() {
    alert("Bad Name");
  }
}
