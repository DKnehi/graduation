export const getDataLocal = (key) => {
  const jsonString = localStorage.getItem(key);
  const data = JSON.parse(jsonString);
  return data;
};
