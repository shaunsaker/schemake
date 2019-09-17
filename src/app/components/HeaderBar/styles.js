import css from 'styled-jsx/css';

import { rhythm } from '../../static/styles/styleConstants';

const logoWidth = 136;

const styles = css`
  .logo-image-wrapper {
    flex: 1;
    justify-content: flex-start;
    margin-right: ${rhythm.hz}px;
    padding: ${rhythm.vt / 2}px 0;
    display: flex; /* to align items to start */
  }
  .logo-image-container {
    position: relative;
    align-self: flex-start;
  }
  .logo-image {
    width: ${logoWidth}px;
    cursor: pointer;
  }
  .alpha-text-container {
    position: absolute;
    bottom: -4px;
    right: 0;
  }

  .action-panel-container {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-left: ${rhythm.hz}px;
  }

  @media (max-width: 767px) {
    .text-container {
      display: none;
    }
  }
`;

export default styles;
