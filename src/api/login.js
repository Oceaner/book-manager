import myaxios from "../utils/myaxios";

export function login(username, password) {
  return myaxios({
    url: "/user/login",
    method: "post",
    data() {
      return {
        username,
        password,
      };
    },
  });
}

export function getUserInfor(token) {
  return myaxios({
    url: "/user/info/${token}",
    method: "get",
  });
}
