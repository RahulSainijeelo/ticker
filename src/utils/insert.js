import { app } from "./realm";

export const inserOne = async (functionName, args) => {
  const user = app.currentUser || await app.logIn(Realm.Credentials.anonymous());
  const result = await user.callFunction(functionName, args);
  return result;
};


///args
////
// args = {
// month:12,
// year:2024,
// day:{data:12,hours:"234"}
// }