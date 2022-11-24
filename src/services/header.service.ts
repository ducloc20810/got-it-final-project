import { AUTH_STORAGE_KEY } from 'constants/storage';
import { AUTH, NO_AUTH } from './helper';

export default function generateHeader(type: typeof AUTH | typeof NO_AUTH) {
  let user = null;
  const localStorageData = localStorage.getItem(AUTH_STORAGE_KEY);
  if (localStorageData) user = JSON.parse(localStorageData);

  if (user && user.accessToken && type === AUTH) {
    return new Headers({
      Authorization: `Bearer ${user.accessToken}`,
      'Content-Type': 'application/json',
    });
  }
  return new Headers({
    'Content-Type': 'application/json',
  });
}
