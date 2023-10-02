import { User } from "./models/user/User";

export class State {
  constructor() {
    this._currentUser = null;
  }
  set currentUser(user) {
    this._currentUser = user;
  }
  get currentUser() {
    return this._currentUser;
  }
  get isAdmin(){
    return User.isAdmin(this._currentUser);
  }
}
