import { appState } from "../app";
import { User } from "../models/user/User";

export const authUser = function (login, password) {
  const user = new User(login, password);
  if (!user.hasAccess) return false;
  appState.currentUser = user;
  return true;
};
