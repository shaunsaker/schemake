import css from 'styled-jsx/css'; // eslint-disable-line

import { colors, rhythm, sizes } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    background-color: ${colors.lightGrey};
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
  }

  .note-text-container {
  }
`;

export default styles;
