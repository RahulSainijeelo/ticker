import { app, Realm } from "./realm";
const user = app.currentUser || await app.logIn(Realm.Credentials.anonymous());

export const blk = async (functionName, args) => {
  const result = await user.callFunction(functionName, args);
  return result;
};

export const sgl = async (functionName, args) => {
    const result = await user.callFunction(functionName,args);
    re
}