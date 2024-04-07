import moment from "moment";

export const convertToTime = (decimalTime) => {
  const hours = Math.floor(decimalTime);
  const minutes = Math.floor((decimalTime - hours) * 60);
  const seconds = Math.round(((decimalTime - hours) * 60 - minutes) * 60);

  return moment
    .utc()
    .startOf("day")
    .add({ hours, minutes, seconds })
    .format("HH:mm");
};
