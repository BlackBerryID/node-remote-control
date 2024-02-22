import { randomUUID } from 'node:crypto';
import { db } from '../db';

const NO_USER_IN_DB = 'no user in db';
const WRONG_PASSWORD = 'wrong password';

const validateUserData = (name: string, password: string) => {
  const userInDb = db.users.find((user) => user.name === name);

  if (userInDb === undefined) return NO_USER_IN_DB;
  if (userInDb?.name === name && userInDb?.password === password) {
    return userInDb;
  } else {
    return WRONG_PASSWORD;
  }
};

export const handleReg = (parsedMessage: any, wsId: string) => {
  const { type, data, id } = parsedMessage;
  const { name, password } = JSON.parse(data);
  let userData;
  let isError = false;

  const validatedUserData = validateUserData(name, password);

  if (validatedUserData === NO_USER_IN_DB) {
    userData = {
      name,
      password,
      index: wsId,
    };

    db.users.push(userData);
  } else if (validatedUserData === WRONG_PASSWORD) {
    isError = true;
  } else if (validatedUserData) {
    userData = {
      name: validatedUserData.name,
      index: validatedUserData.index,
    };
  }

  const response = {
    type,
    data: JSON.stringify({
      name: userData?.name,
      index: userData?.index,
      error: isError,
      errorText: isError ? 'wrong password' : '',
    }),
    id,
  };

  return response;
};
