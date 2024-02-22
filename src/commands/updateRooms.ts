import { randomUUID } from 'node:crypto';
import { db, UserWithoutPassword } from '../db';

export const handleUpdateRooms = (type: string, parsedMessage?: any, userId?: string) => {
  if (type === 'create_room') {
    db.rooms.push({
      roomId: randomUUID(),
      roomUsers: [],
    });
  }

  if (type === 'add_user_to_room') {
    const roomId = JSON.parse(parsedMessage.data).indexRoom;
    db.rooms = db.rooms.map((room) => {
      if (room.roomId === roomId) {
        const user = db.users.find((user) => user.index === userId) as UserWithoutPassword;
        room.roomUsers.push({
          index: user.index,
          name: user.name,
        });
      }

      return room;
    });
  }

  let responseCreateGame;

  const roomWhereToStartGame = db.rooms.find((room) => room.roomUsers.length >= 2);

  if (roomWhereToStartGame) {
    const game = {
      gameId: randomUUID(),
      playersIds: roomWhereToStartGame?.roomUsers.map((user) => user.index) as string[],
    };
    db.games.push(game);
    responseCreateGame = {
      type: 'create_game',
      data: JSON.stringify({
        idGame: game.gameId,
        idPlayer: game.playersIds,
      }),
      id: 0,
    };

    db.rooms = db.rooms.filter((room) => room.roomId !== roomWhereToStartGame.roomId);
  }

  const responseUpdateRooms = {
    type: 'update_room',
    data: JSON.stringify(db.rooms),
    id: 0,
  };

  return [responseUpdateRooms, responseCreateGame];
};
