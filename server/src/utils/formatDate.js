export const formatDate = (expiresIn) => {
  const expires = new Date(Date.now() + expiresIn * 1000);
  const day = String(expires.getDate()).padStart(2, "0");
  const month = String(expires.getMonth() + 1).padStart(2, "0");
  const year = expires.getFullYear();
  const hours = String(expires.getHours()).padStart(2, "0");
  const minutes = String(expires.getMinutes()).padStart(2, "0");
  const seconds = String(expires.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
