import css from 'styled-jsx/css'; // eslint-disable-line

import { rhythm } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    width: 100%;
    padding: ${rhythm.vt}px ${rhythm.hz}px;
    display: flex;
    align-items: center;
  }

  .avatar-container {
    margin-right: ${rhythm.hz / 2}px;
  }

  .text-container {
    flex: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .value-text-container {
    flex: 1;

    /* TextLoading */
    position: relative;
    min-height: 21px;
  }

  .text-spacer {
    height: ${rhythm.vt / 4}px;
  }

  .menu-container {
    position: absolute;
    top: 0;
    right: ${rhythm.hz / 2}px;
    bottom: 0;
    display: flex;
    align-items: center;
  }
`;

export default styles;
