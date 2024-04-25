import moment from "moment";

export const convertToTime = (totalSeconds) => {
  const duration = moment.duration(totalSeconds, "seconds");
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.minutes());
  const seconds = Math.floor(duration.seconds());

  return moment
    .utc()
    .startOf("day")
    .add({ hours, minutes, seconds })
    .format("HH:mm:ss");
};
