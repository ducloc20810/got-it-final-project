import authHeader from "./authHeader.service";

const helper = {
  get: (url: string) =>
    fetch(url, {
      method: "GET",
    }),

  post: (url: string, bodyPayload: any) =>
    fetch(url, {
      method: "POST",
      headers: authHeader("noAuth"),
      body: JSON.stringify(bodyPayload),
    }),

  put: (url: string, bodyPayload: any) =>
    fetch(url, {
      method: "PUT",
      headers: authHeader("noAuth"),

      body: JSON.stringify(bodyPayload),
    }),

  delete: (url: string) =>
    fetch(url, {
      method: "DELETE",
      headers: authHeader("noAuth"),
    }),

  getWithAuthentication: (url: string) =>
    fetch(url, {
      method: "GET",
      headers: authHeader("auth"),
    }),

  postWithAuthentication: (url: string, bodyPayload: any) =>
    fetch(url, {
      method: "POST",
      headers: authHeader("auth"),
      body: JSON.stringify(bodyPayload),
    }),

  putWithAuthentication: (url: string, bodyPayload: any) =>
    fetch(url, {
      method: "PUT",
      headers: authHeader("auth"),
      body: JSON.stringify(bodyPayload),
    }),

  deleteWithAuthentication: (url: string) =>
    fetch(url, {
      method: "DELETE",
      headers: authHeader("auth"),
    }),
};

export default helper;
