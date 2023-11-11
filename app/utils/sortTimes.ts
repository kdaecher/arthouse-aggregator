function convertTime(timeStr: string) {
  const [time, period] = timeStr.split(/([ap]m)/);
  const [hour, minute] = time.split(":");
  const isPM = period.toLowerCase() === "pm";
  const hours = parseInt(hour);
  const minutes = parseInt(minute);

  // Special handling for 12am and 12pm
  if (hours === 12) {
    return (isPM ? hours : 0) * 60 + minutes;
  } else {
    return (isPM ? hours + 12 : hours) * 60 + minutes;
  }
}

export function compareTime(a: string, b: string) {
  // Convert the time strings to a format that can be compared
  const timeA = convertTime(a);
  const timeB = convertTime(b);

  if (timeA < timeB) return -1;
  if (timeA > timeB) return 1;
  return 0;
}

export default function sortTimes(timeArray: string[]) {
  return timeArray.sort(compareTime);
}
