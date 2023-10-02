import { Role } from "./models/enum";
import { Task } from "./models/task/Task";

export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const replaceToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  const index = storageData.findIndex(n => n.id === obj.id);
  if (index !== -1) {
    storageData.splice(index, 1, obj);
  }
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const deleteToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  const index = storageData.findIndex(n => n.id === obj.id);
  if (index !== -1) {
    storageData.splice(index, 1);
  }
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const generateTestUser = function (User) {
  // localStorage.clear();
  const adminUser = new User("admin", "admin", Role.R_ADMIN);
  if (!User.isHasThisUser(adminUser)) {
    User.save(adminUser);
  }

  const testUser = new User("user", "qwerty123", Role.R_USER);
  if (!User.isHasThisUser(testUser)) {
    User.save(testUser);
  }
};

