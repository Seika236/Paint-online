import {WebsocketCanvasService} from "../services/WebsocketCanvasService.js";

class WebsocketController  {
  constructor(wss) {
    this.wss = wss
    this.init()
  }

  init() {
    this.wss.on('connection', (ws) => {

      ws.on("open", () => this.onOpen())
      ws.on("message", (message) => this.onMessage(ws,  message))
      ws.on("close", () => this.onClose())
      ws.on("error", (err) => this.onError(err))
    })
  }

  onError(err) {
    try {
      console.error(err)
    } catch (e) {
      throw e
    }
  }

  onClose() {
    console.log("closed")

  }

  onOpen() {
    console.log("connected")
 }

 onMessage(ws, message) {
    const data = JSON.parse(message.toString())
   const actions = {
      "connection": () =>  WebsocketCanvasService.userConnection(this.wss,  ws,  data),
      "draw": () => WebsocketCanvasService.changeDrawHistory(this.wss, ws, data),
      "update": () => WebsocketCanvasService.updateHistory(this.wss, data),
   }

   actions[data.type]()
 }

 }

 export default WebsocketController;