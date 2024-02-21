import WebSocket, { WebSocketServer } from 'ws';
import { handleReg } from '../commands/reg';

const wss = new WebSocketServer({
  port: 3000,
});

//TODO type
const broadcastMessage = (message: any) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  ws.on('message', function (message) {
    const parsedMessage = JSON.parse(message.toString());
    const type = parsedMessage.type;
    let response;

    switch (type) {
      case 'reg':
        response = handleReg(parsedMessage);
        break;

      default:
        break;
    }

    broadcastMessage(response);
  });
});
