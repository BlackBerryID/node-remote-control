type Users = {
  name: string;
  password: string;
  index: string;
};

export type UserWithoutPassword = Omit<Users, 'password'>;

type Winners = {
  name: string;
  wins: number;
};

type Rooms = {
  roomId: string;
  roomUsers: UserWithoutPassword[];
};

type Games = {
  gameId: string;
  playersIds: string[];
};

interface IDb {
  users: Users[];
  winners: Winners[];
  rooms: Rooms[];
  games: Games[];
}

export const db: IDb = {
  users: [],
  winners: [],
  rooms: [],
  games: [],
};
