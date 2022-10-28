export const setUserLocal = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

export const getUserLocal = (name) => {
  return JSON.parse(localStorage.getItem(name));
};
export const login = (user) => {
  setUserLocal("login", user);
};

export const setStateLogin = (store) => {
  const user = getUserLocal("login");
  store.dispatch("auth/setStateLogin", user);
};
