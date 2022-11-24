import helper from './helper';

const LOGIN_API_URL = `${process.env.REACT_APP_BACK_END_URL}/auth`;
const REGISTER_API_URL = `${process.env.REACT_APP_BACK_END_URL}/users`;

const AuthService = {
  login(email: string, password: string) {
    const payload = { email, password };
    return helper.post(LOGIN_API_URL, payload);
  },

  logout() {
    localStorage.removeItem('auth');
  },

  register(name: string, email: string, password: string) {
    const payload = { email, password, name };
    return helper.post(REGISTER_API_URL, payload);
  },
};
export default AuthService;
