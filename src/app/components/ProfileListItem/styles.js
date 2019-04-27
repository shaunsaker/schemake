import css from 'styled-jsx/css'; // eslint-disable-line

import { colors, rhythm } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    display: flex;
    align-items: center;
    padding: ${rhythm.vt}px ${rhythm.hz}px;
  }

  .bg {
    background-color: ${colors.lightGrey};
  }

  .value-text-container {
    margin-left: ${rhythm.hz}px;
    flex: 1;
  }
`;

export default styles;
