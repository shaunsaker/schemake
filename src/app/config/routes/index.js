import app from '../app';
import SEO from '../SEO';

const getTitle = (page) => {
  const title = `${page} | ${app.name}`;

  return title;
};

const routes = {
  login: {
    title: getTitle('Login'),
    description: SEO.description,
    href: '/login',
  },
  signUp: {
    title: getTitle('Sign Up'),
    description: SEO.description,
    href: '/signup',
  },
  dashboard: {
    title: getTitle('Dashboard'),
    description: SEO.description,
    href: '/dashboard?tabId=projects',
  },
  support: {
    title: getTitle('Support'),
    description: SEO.description,
    href: '/support',
  },
  profile: {
    title: getTitle('Profile'),
    description: SEO.description,
    href: '/profile?tabId=general',
  },
};

export default routes;
