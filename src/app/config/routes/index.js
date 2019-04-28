import app from '../app';
import SEO from '../SEO';

const getTitle = (page) => {
  const title = `${page} | ${app.name}`;

  return title;
};

const routes = {
  home: {
    title: getTitle('Home'),
    description: SEO.description,
    href: '/',
  },
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
};

export default routes;
