import * as Realm from "realm-web";

const app = new Realm.App({ id: import.meta.env.VITE_REALM_APP_ID });
export { app, Realm };
