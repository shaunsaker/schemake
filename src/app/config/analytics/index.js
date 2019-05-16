import events from './events';

const analytics = {
  trackingId: process.env.REACT_APP_GA_TRACKING_Id,
  events,
};

export default analytics;
