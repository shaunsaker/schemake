import css from 'styled-jsx/css'; // eslint-disable-line

import { rhythm } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    min-height: 100vh; /* so that we don't see a jump on load of tabs data */
  }

  .circular-progress-container {
    text-align: center;
    margin-top: ${rhythm.vt * 2}px;
  }
`;

export default styles;
