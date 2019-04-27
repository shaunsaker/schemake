import css from 'styled-jsx/css'; // eslint-disable-line

import { rhythm, sizes } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    padding: ${rhythm.vt / 2}px ${rhythm.hz / 2}px;
    border-radius: ${sizes.borderRadius}px;
  }

  .user-container {
    display: flex;
    align-items: center;
    margin-bottom: ${rhythm.vt / 2}px;
  }

  .user-avatar-container {
    margin-right: ${rhythm.hz / 2}px;
  }

  .user-text-container {
    flex: 1;
  }

  .menu-button-container {
    align-self: flex-start;
  }

  .note-text-container {
  }
`;

export default styles;
