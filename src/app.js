import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import "./styles/styleKanban.css";
import "./styles/styleUserMenu.css";
import { setTaskFieldTemplate } from "./services/taskFieldTemplate";
import { setNoAccessTemplate } from "./services/noAccessTemplate";
import { User } from "./models/user/User";
import { generateTestUser } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";
import { setMenuAsAdmin, setMenuAsUser } from "./services/menuUser";

export const appState = new State();
export const documentHTML = function () {
  return document;
}
const loginForm = document.querySelector("#app-login-form");

generateTestUser(User);

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");

  if (authUser(login, password)) {
    // если пароль верный
    setTaskFieldTemplate(document);

    if (User.isAdmin(appState.currentUser)) {
      setMenuAsAdmin(document);
    } else {
      setMenuAsUser(document);
    }
  } else {
    // пароль не верный
    setNoAccessTemplate(document);
  }
});

export const clickOut = function (e) {
  appState._currentUser = null;
  document.querySelector("#content").innerHTML = '<p id="content">Please Sign In to see your tasks!</p>';
  for (let i = 0; i < 2; i++) {
    document.querySelectorAll('.form-control')[i].style.display = "block";
  }
  document.querySelector('#app-login-btn').style.display = "block";
  document.querySelector('#app-out-btn').style.display = "none";
};


