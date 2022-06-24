export const errorHandler = (err: Error) => {
  console.log(
    `I'm sorry, but there is an Error with message: ${err.message}. Please, try to reload page by pressing F5.`
  );
};
