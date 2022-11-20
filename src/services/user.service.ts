import authHeader from "./authHeader.service";

const API_URL = `${process.env.REACT_APP_BACK_END_URL}/users/me`;

const UserService = {
  getUserInfo() {
    return fetch(API_URL, {
      method: "GET",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
    });
  },
};
export default UserService;
