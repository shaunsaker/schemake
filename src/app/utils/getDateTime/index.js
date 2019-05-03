import { getElapsedDays, getElapsedHours, getPrettyDate } from 'js-simple-utils';

import getElapsedMinutes from '../getElapsedMinutes';

const getDateTime = (date) => {
  const prettyDate = getPrettyDate(date, true);
  const elapsedDays = Math.round(getElapsedDays(date));
  let elapsedText;

  if (elapsedDays < 1) {
    const elapsedHours = Math.round(getElapsedHours(date));

    if (elapsedHours === 0) {
      const elapsedMinutes = Math.round(getElapsedMinutes(date));

      if (elapsedMinutes === 0) {
        elapsedText = 'less than a minute ago';
      } else {
        elapsedText = `${elapsedMinutes} minutes ago`;
      }
    } else {
      elapsedText = `${elapsedHours} hours ago`;
    }
  } else {
    elapsedText = `${elapsedDays} days ago`;
  }

  const dateTime = `${prettyDate} (${elapsedText})`;

  return dateTime;
};

export default getDateTime;
