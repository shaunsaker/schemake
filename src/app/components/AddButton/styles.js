import css from 'styled-jsx/css'; // eslint-disable-line

import { rhythm } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    padding: ${rhythm.vt}px ${rhythm.hz}px;
  }

  .icon-container {
    margin-bottom: ${rhythm.vt / 2}px;
  }
`;

export default styles;
