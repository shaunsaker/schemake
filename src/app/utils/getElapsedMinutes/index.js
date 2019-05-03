const getElapsedMinutes = (timestamp) => {
  const date = new Date(timestamp);
  const now = Date.now();
  const difference = now - date;
  const minute = 1000 * 60;
  const elapsedMinutes = difference / minute;

  return elapsedMinutes;
};

export default getElapsedMinutes;
