import generateHeader from 'services/header.service';
import { toSnakeCase } from '../utils/library';

export const AUTH = 'auth';
export const NO_AUTH = 'noAuth';

const helper = {
  get: (url: string) =>
    fetch(url, {
      method: 'GET',
    }),

  post: (url: string, bodyPayload: any) => {
    const payload = toSnakeCase(bodyPayload);
    return fetch(url, {
      method: 'POST',
      headers: generateHeader(NO_AUTH),
      body: JSON.stringify(payload),
    });
  },

  put: (url: string, bodyPayload: any) => {
    const payload = toSnakeCase(bodyPayload);
    return fetch(url, {
      method: 'PUT',
      headers: generateHeader(NO_AUTH),

      body: JSON.stringify(payload),
    });
  },

  delete: (url: string) =>
    fetch(url, {
      method: 'DELETE',
      headers: generateHeader(NO_AUTH),
    }),

  getWithAuthentication: (url: string) =>
    fetch(url, {
      method: 'GET',
      headers: generateHeader(AUTH),
    }),

  postWithAuthentication: (url: string, bodyPayload: any) => {
    const payload = toSnakeCase(bodyPayload);
    return fetch(url, {
      method: 'POST',
      headers: generateHeader(AUTH),
      body: JSON.stringify(payload),
    });
  },

  putWithAuthentication: (url: string, bodyPayload: any) => {
    const payload = toSnakeCase(bodyPayload);
    return fetch(url, {
      method: 'PUT',
      headers: generateHeader(AUTH),

      body: JSON.stringify(payload),
    });
  },

  deleteWithAuthentication: (url: string) =>
    fetch(url, {
      method: 'DELETE',
      headers: generateHeader(AUTH),
    }),
};

export default helper;
