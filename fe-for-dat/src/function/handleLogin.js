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
  if (user) {
    store.dispatch("auth/getListAddress", user.access_token);
  }
};

export const removeUserLocal = (name) => {
  sessionStorage.removeItem(name);
};

const timeoutInMS = 1800000; // 30 minutes -> 30 * 60 * 1000
let timeoutId;

export const handleInactive = () => {
  if (getUserLocal("login")) {
    // store.dispatch("auth/logout", user.access_token);
    sessionStorage.removeItem("login");
    window.Swal.fire({
      icon: "error",
      title: "Thông Báo",
      text: "Đã hết thời gian sử dụng. Vui lòng đăng nhập lại",
    });
    location.reload();
  }
};

export const startTimer = () => {
  // setTimeout returns an ID (can be used to start or clear a timer)
  timeoutId = setTimeout(handleInactive, timeoutInMS);
};

export const resetTimer = () => {
  clearTimeout(timeoutId);
  startTimer();
};

export const setupTimers = () => {
  document.addEventListener("keypress", resetTimer, false);
  document.addEventListener("mousemove", resetTimer, false);
  document.addEventListener("mousedown", resetTimer, false);
  document.addEventListener("touchmove", resetTimer, false);

  startTimer();
};
