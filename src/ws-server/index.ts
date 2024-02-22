import { randomUUID } from 'node:crypto';
import WebSocket, { WebSocketServer } from 'ws';
import { handleReg } from '../commands/reg';
import { handleUpdateRooms } from '../commands/updateRooms';
import { handleUpdateWinners } from '../commands/updateWinners';

interface IWsExtended extends WebSocket {
  id?: string;
}

const wss = new WebSocketServer({
  port: 3000,
});

const broadcastMessage = (message: any, id?: string | null, userId?: string) => {
  wss.clients.forEach((client: IWsExtended) => {
    if (client.readyState === WebSocket.OPEN) {
      if (id) {
        if (client.id === id) {
          client.send(JSON.stringify(message));
        }
        return;
      } else if (userId) {
        const tempMessage = {
          ...message,
          data: JSON.parse(message.data),
        };

        if (tempMessage.data.idPlayer.includes(client.id)) {
          tempMessage.data.idPlayer = client.id;
          tempMessage.data = JSON.stringify(tempMessage.data);
          client.send(JSON.stringify(tempMessage));
        }

        return;
      } else {
        client.send(JSON.stringify(message));
      }
    }
  });
};

wss.on('connection', function connection(ws: IWsExtended) {
  ws.id = randomUUID();
  ws.on('error', console.error);
  ws.on('message', function (message) {
    const parsedMessage = JSON.parse(message.toString());
    const type = parsedMessage.type;

    console.log('type: ', type);
    console.log('parsedMessage: ', parsedMessage);

    switch (type) {
      case 'reg': {
        const regResponse = handleReg(parsedMessage, ws.id!);
        broadcastMessage(regResponse, ws.id);

        const [updateRoomsResponse] = handleUpdateRooms('reg');
        broadcastMessage(updateRoomsResponse);

        const updateWinnersResponse = handleUpdateWinners();
        broadcastMessage(updateWinnersResponse);
        break;
      }
      case 'create_room': {
        const [updateRoomsResponse] = handleUpdateRooms('create_room');
        broadcastMessage(updateRoomsResponse);
        break;
      }

      case 'add_user_to_room': {
        const [updateRoomsResponse, responseCreateGame] = handleUpdateRooms(
          'add_user_to_room',
          parsedMessage,
          ws.id,
        );
        broadcastMessage(updateRoomsResponse);
        if (responseCreateGame) {
          broadcastMessage(responseCreateGame, null, ws.id);
        }
        break;
      }

      default:
        break;
    }
  });
});
