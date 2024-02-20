import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws';
import { db } from '../db.js';

const wss = new WebSocketServer({
  port: 3000,
});

// const broadcastMessage = (message) => {};

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function (message) {
    const parsedMessage = JSON.parse(message.toString('utf-8'));
    const type = parsedMessage.type;
    let response;

    // switch (type) {
    //   case "reg":
    //     response = {

    //     }
    //     break;

    //   default:
    //     break;
    // }
    console.log('parsedMessage: ', parsedMessage);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: false });
      }
    });
  });

  // ws.send("something");
});

// wss.on("connection", (ws) => {
//   console.log("connection");
//   const wsStream = createWebSocketStream(ws, {
//     encoding: "utf-8",
//     decodeStrings: false,
//   });

//   wsStream.on("data", (chunk) => {
//     const data = chunk.toString();
//     console.log("server data: ", data);

//     wss.clients.forEach(function each(client) {
//       // if (client.readyState === WebSocket.OPEN) {
//       client.send(data);
//       // }
//     });
//   });
// });
