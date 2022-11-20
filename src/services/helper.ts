import authHeader from "./authHeader.service";

const helper = {
  get: (url: string) =>
    fetch(url, {
      method: "GET",
    }),

  post: (url: string, bodyPayload: any) =>
    fetch(url, {
      method: "POST",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPayload),
    }),

  put: (url: string, bodyPayload: any) =>
    fetch(url, {
      method: "PUT",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPayload),
    }),

  delete: (url: string) =>
    fetch(url, {
      method: "DELETE",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
    }),
};

export default helper;
