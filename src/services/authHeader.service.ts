export default function authHeader(type: string) {
  let user = null;
  let localStorageData = localStorage.getItem("auth");
  if (localStorageData) user = JSON.parse(localStorageData);

  if (user && user.access_token && type === "auth") {
    return new Headers({
      Authorization: `Bearer ${user.access_token}`,
      "Content-Type": "application/json",
    });
  } else {
    return new Headers({
      "Content-Type": "application/json",
    });
  }
}
