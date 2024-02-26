export default function getHourOfTime (time: string) {
  const match = time.match(/(\d{1,2}):(\d{2})\s?(am|pm)/i);
  const hour = match ? match[1] + match[3].toLowerCase() : '';
  return hour; 
}
