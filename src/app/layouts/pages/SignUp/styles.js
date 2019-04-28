import css from 'styled-jsx/css';

import { rhythm } from '../../../static/styles/styleConstants';

const signUpTextMargin = 5;

const styles = css`
  .container {
  }

  .text-container {
    margin-bottom: ${rhythm.vt * 2}px;
  }

  .forgot-password-text-container {
    margin-bottom: ${rhythm.vt}px;
  }

  .footer-text-container {
    margin-top: ${rhythm.vt + signUpTextMargin}px;
    display: flex;
  }

  .signup-text-container {
    margin-top: -${signUpTextMargin}px;
  }
`;

export default styles;
