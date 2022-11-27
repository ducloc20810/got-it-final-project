import generateHeader from 'services/header.service';
import { snakeCaseObjKeys } from '../utils/library';

export const AUTH = 'auth';
export const NO_AUTH = 'noAuth';
export const BACK_END_URL = process.env.REACT_APP_BACK_END_URL;

const helper = {
  get: (url: string) =>
    fetch(BACK_END_URL + url, {
      method: 'GET',
    }),

  post: (url: string, bodyPayload: any) => {
    const payload = snakeCaseObjKeys(bodyPayload);
    return fetch(BACK_END_URL + url, {
      method: 'POST',
      headers: generateHeader(NO_AUTH),
      body: JSON.stringify(payload),
    });
  },

  put: (url: string, bodyPayload: any) => {
    const payload = snakeCaseObjKeys(bodyPayload);
    return fetch(BACK_END_URL + url, {
      method: 'PUT',
      headers: generateHeader(NO_AUTH),

      body: JSON.stringify(payload),
    });
  },

  delete: (url: string) =>
    fetch(BACK_END_URL + url, {
      method: 'DELETE',
      headers: generateHeader(NO_AUTH),
    }),

  getWithAuthentication: (url: string) =>
    fetch(BACK_END_URL + url, {
      method: 'GET',
      headers: generateHeader(AUTH),
    }),

  postWithAuthentication: (url: string, bodyPayload: any) => {
    const payload = snakeCaseObjKeys(bodyPayload);
    return fetch(BACK_END_URL + url, {
      method: 'POST',
      headers: generateHeader(AUTH),
      body: JSON.stringify(payload),
    });
  },

  putWithAuthentication: (url: string, bodyPayload: any) => {
    const payload = snakeCaseObjKeys(bodyPayload);
    return fetch(BACK_END_URL + url, {
      method: 'PUT',
      headers: generateHeader(AUTH),

      body: JSON.stringify(payload),
    });
  },

  deleteWithAuthentication: (url: string) =>
    fetch(BACK_END_URL + url, {
      method: 'DELETE',
      headers: generateHeader(AUTH),
    }),
};

export default helper;
