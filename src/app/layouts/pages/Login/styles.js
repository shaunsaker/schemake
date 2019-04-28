import css from 'styled-jsx/css';

import { rhythm } from '../../../static/styles/styleConstants';

const styles = css`
  .container {
    padding: ${rhythm.vt * 4}px 0;
  }

  .text-container {
    margin-bottom: ${rhythm.vt * 2}px;
  }

  .forgot-password-text-container {
    margin-bottom: ${rhythm.vt}px;
  }

  .signup-text-container {
    margin-top: ${rhythm.vt}px;
  }
`;

export default styles;
