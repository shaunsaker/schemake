import { getElapsedDays, getElapsedHours, getPrettyDate } from 'js-simple-utils';

import getElapsedMinutes from '../getElapsedMinutes';
import getStringPlurality from '../getStringPlurality';

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
        elapsedText = `${elapsedMinutes} minute${getStringPlurality(elapsedMinutes)} ago`;
      }
    } else {
      elapsedText = `${elapsedHours} hour${getStringPlurality(elapsedHours)} ago`;
    }
  } else {
    elapsedText = `${elapsedDays} day${getStringPlurality(elapsedDays)} ago`;
  }

  const dateTime = `${prettyDate} (${elapsedText})`;

  return dateTime;
};

export default getDateTime;
