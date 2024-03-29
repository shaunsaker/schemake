import css from 'styled-jsx/css'; // eslint-disable-line

import { rhythm, sizes } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    max-width: ${sizes.maxModalWidth}px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .content-container {
    padding: ${rhythm.vt * 2}px ${rhythm.hz}px;
  }

  .text-container {
    margin-bottom: ${rhythm.vt * 2}px;
  }

  .close-button-container {
    text-align: center;
  }

  .content-container {
    padding: ${rhythm.vt * 2}px ${rhythm.hz / 2}px;
  }
`;

export default styles;
