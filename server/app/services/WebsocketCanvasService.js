export class WebsocketCanvasService {
  static userConnection(wss, ws, data) {
    let isUpdateHistoryRequest = true
    ws.id = data.id

    for (let client of wss.clients) {
      if (client.id == data.id) {
        if (client.name === data.name) {
          ws.send(JSON.stringify({
            type: "badname",
            message: "имя пользователя уже существует"
          }));
          return;
        }
      }
    }

    ws.name = data.name;

    wss.clients.forEach(client => {
      if (client.id === data.id) {
        if (client.name !== data.name && isUpdateHistoryRequest) {
          client.send(JSON.stringify({
            type: "update",
          }))
          isUpdateHistoryRequest = false;
        }

        client.send(JSON.stringify({message:`в чат вошел ${data.name}`, type: "connection"
      }))
      }
    })
  }

  static updateHistory (wss, data) {
      wss.clients.forEach(client => {
        client.send(JSON.stringify({
          type: "fullUpdate",
          history: data.history,
        }))
      })
  }

  static changeDrawHistory(wss, ws, data) {
    wss.clients.forEach(client => {
      if (client.id === ws.id) {
        client.send(JSON.stringify({
          type: "draw",
          history: data.history,
          message: `пользователь ${data.name} изменил холст`
        }))
      }
    })
  }
}