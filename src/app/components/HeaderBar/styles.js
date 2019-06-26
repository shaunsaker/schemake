import css from 'styled-jsx/css';

import { rhythm } from '../../static/styles/styleConstants';

const logoWidth = 175;

const styles = css`
  .logo-image-container {
    flex: 1;
    display: flex;
    align-items: center;
    margin-right: ${rhythm.hz}px;
    padding: ${rhythm.vt / 2}px 0;
    position: relative;
  }

  .logo-image {
    width: ${logoWidth}px;
    cursor: pointer;
  }

  .alpha-text-container {
    position: absolute;
    bottom: ${rhythm.vt / 8}px;
    left: ${logoWidth - 43}px; /* - width of the text */
  }

  .action-panel-container {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-left: ${rhythm.hz}px;
  }
`;

export default styles;
