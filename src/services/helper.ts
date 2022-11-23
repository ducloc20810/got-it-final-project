import { AUTH, NO_AUTH } from "constants/storage";
import generateHeader from "services/header.service";

const helper = {
  get: (url: string) =>
    fetch(url, {
      method: "GET",
    }),

  post: (url: string, bodyPayload: any) =>
    fetch(url, {
      method: "POST",
      headers: generateHeader(NO_AUTH),
      body: JSON.stringify(bodyPayload),
    }),

  put: (url: string, bodyPayload: any) =>
    fetch(url, {
      method: "PUT",
      headers: generateHeader(NO_AUTH),

      body: JSON.stringify(bodyPayload),
    }),

  delete: (url: string) =>
    fetch(url, {
      method: "DELETE",
      headers: generateHeader(NO_AUTH),
    }),

  getWithAuthentication: (url: string) =>
    fetch(url, {
      method: "GET",
      headers: generateHeader(AUTH),
    }),

  postWithAuthentication: (url: string, bodyPayload: any) =>
    fetch(url, {
      method: "POST",
      headers: generateHeader(AUTH),
      body: JSON.stringify(bodyPayload),
    }),

  putWithAuthentication: (url: string, bodyPayload: any) =>
    fetch(url, {
      method: "PUT",
      headers: generateHeader(AUTH),
      body: JSON.stringify(bodyPayload),
    }),

  deleteWithAuthentication: (url: string) =>
    fetch(url, {
      method: "DELETE",
      headers: generateHeader(AUTH),
    }),
};

export default helper;
