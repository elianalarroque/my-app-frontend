import { decodeToken } from "react-jwt";

/*guardar token en localStorage*/
export function saveToken(token) {
  localStorage.setItem("token", token);
}

/*obtengo token desde localstorage*/
export function getToken() {
  return localStorage.getItem("token");
}

/* guardo los datos del usuario */
export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user)); 
}

/*obtengo datos de usuario*/
export function getUser() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);//convierto json a objeto
  } else {
    return null;
  }
}

/* para el logout */
export function removeAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

/* verifico si el token existe y no expiró */
export function isAuth() {
  const token = getToken();
  if (!token) {
    return false;
  }
  /*variable para ver que hay detnro del token*/
  const decoded = decodeToken(token);

  /*verifico si existe o si expiro*/
  if (!decoded || decoded.exp * 1000 < Date.now()) {
    removeAuth(); //limpio
    return false;
  }

  return true;
}

