type Users = {
  name: string;
  password: string;
  index: string;
};

interface IDb {
  users: Users[];
}

export const db: IDb = {
  users: [],
};
