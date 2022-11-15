const LOGIN_API_URL: string = `${process.env.REACT_APP_BACK_END_URL}/auth`;
const REGISTER_API_URL: string = `${process.env.REACT_APP_BACK_END_URL}/users`;

const AuthService = {
  login(email: string, password: string) {
    return fetch(LOGIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  },

  logout() {
    localStorage.removeItem("user");
  },

  register(name: string, email: string, password: string) {
    return fetch(REGISTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
  },
};
export default AuthService;
