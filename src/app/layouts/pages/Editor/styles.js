import css from 'styled-jsx/css';

import { rhythm } from '../../../static/styles/styleConstants';

const styles = css`
  .container {
    min-height: 100vh;
  }

  .text-container {
    margin-bottom: ${rhythm.vt * 2}px;
  }

  .add-button-container {
    margin-top: ${rhythm.vt}px;
  }
`;

export default styles;
