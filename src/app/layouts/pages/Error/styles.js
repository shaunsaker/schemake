import css from 'styled-jsx/css'; // eslint-disable-line

import { rhythm } from '../../../static/styles/styleConstants';

const styles = css`
  .container {
    display: flex;
    flex-direction: column;
  }

  .buttons-container {
    display: flex;
    margin-top: ${rhythm.vt * 2}px;
  }

  .button-container {
    margin-right: ${rhythm.hz}px;
  }
`;

export default styles;
