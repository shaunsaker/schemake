import css from 'styled-jsx/css'; // eslint-disable-line

import { rhythm } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    padding: ${rhythm.vt}px ${rhythm.hz}px;
    display: flex;
    align-items: center;
  }

  .avatar-container {
    margin-right: ${rhythm.hz / 2}px;
  }

  .text-container {
    flex: 1;
  }

  .menu-button-container {
    align-self: flex-start;
  }
`;

export default styles;
