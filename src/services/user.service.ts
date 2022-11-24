import helper from './helper';

const API_URL = `${process.env.REACT_APP_BACK_END_URL}/users/me`;

const UserService = {
  getUserInfo() {
    return helper.getWithAuthentication(API_URL);
  },
};
export default UserService;
