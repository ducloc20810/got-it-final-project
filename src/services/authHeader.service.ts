export default function authHeader() {
  let user = null;
  let localStorageData = localStorage.getItem("user");
  if (localStorageData) user = JSON.parse(localStorageData);

  if (user && user.access_token) {
    return {
      Authorization: `Bearer ${user.access_token}`,
    };
  } else {
    return undefined;
  }
}
