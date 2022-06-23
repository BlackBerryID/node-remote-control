import robot from 'robotjs';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log('Websocket server started on 8080');
});

export const runWSS = () => {
  wss.on('connection', (ws) => {
    console.log('connection');
    ws.on('message', (data) => {
      console.log('message: ', data.toString());
    });
  });
};
