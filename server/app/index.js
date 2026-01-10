import express from 'express';
import http from 'http';
import {WebSocketServer} from "ws";
import WebsocketController from "./controllers/WebsocketController.js"
import dotenv from 'dotenv'
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;
const server = http.createServer(app)

const wss = new WebSocketServer({server});
new WebsocketController(wss)

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})