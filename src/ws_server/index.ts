import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import { mouseControlHandler } from './modules/mouse-control';
import { drawControlHandler } from './modules/draw-control';
import { screenshot } from './modules/screenshot';
import { errorHandler } from './modules/error-handler';

const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log('Websocket server started on 8080');
});

export const runWSS = () => {
  wss.on('connection', (ws) => {
    console.log('connection');
    ws.on('message', (data) => {
      try {
        const mousePos = robot.getMousePos();
        const [command, ...value] = data.toString().split(' ');
        const [mainCommand] = command.split('_');
        switch (mainCommand) {
          case 'mouse':
            mouseControlHandler({ ws, mousePos, command, value });
            break;
          case 'draw':
            drawControlHandler({ ws, mousePos, command, value });
            break;
          case 'prnt':
            screenshot({ ws, mousePos });
            break;
          default:
            break;
        }
        // console.log('message: ', data.toString());
      } catch (err) {
        errorHandler(err as Error);
      }
    });
  });
};
