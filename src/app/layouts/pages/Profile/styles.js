import css from 'styled-jsx/css';

import { rhythm } from '../../../static/styles/styleConstants';

const styles = css`
  .container {
  }

  .text-container {
    margin-bottom: ${rhythm.vt * 2}px;
  }
  .title-container {
    display: flex;
  }
  .back-button-container {
    margin-left: -20px; /* align vertical with page */
    margin-right: ${rhythm.hz / 4}px;
  }

  .tab-bar-container {
    margin-bottom: ${rhythm.vt * 2}px;
  }
`;

export default styles;
