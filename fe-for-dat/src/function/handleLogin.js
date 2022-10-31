export const setUserLocal = (name, item) => {
  sessionStorage.setItem(name, JSON.stringify(item));
};

export const getUserLocal = (name) => {
  return JSON.parse(sessionStorage.getItem(name));
};
export const login = (user) => {
  setUserLocal("login", user);
};

export const setStateLogin = (store) => {
  const user = getUserLocal("login");
  store.dispatch("auth/setStateLogin", user);
};

export const removeUserLocal = (name) => {
  sessionStorage.removeItem(name);
}

