import { getElapsedDays, getElapsedHours, getPrettyDate } from 'js-simple-utils';

const getDateTime = (date) => {
  const prettyDate = getPrettyDate(date, true);
  const elapsedDays = Math.round(getElapsedDays(date));
  let elapsedText;

  if (elapsedDays < 1) {
    const elapsedHours = getElapsedHours;
    elapsedText = `${elapsedHours} hours`;
  } else {
    elapsedText = `${elapsedDays} days`;
  }

  const dateTime = `${prettyDate} (${elapsedText} ago)`;

  return dateTime;
};

export default getDateTime;
