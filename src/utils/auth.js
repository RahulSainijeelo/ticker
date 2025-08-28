import { app, Realm } from "./realme";
var user;
const loginAnonymous = async () => {
  try {
    user = await app.logIn(Realm.Credentials.anonymous());
    return {user};
  } catch (err) {
    return "something wrong";
  }
};
// loginAnonymous();
const getUser = () => user;
export {getUser,loginAnonymous}