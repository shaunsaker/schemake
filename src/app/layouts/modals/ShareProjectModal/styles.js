import css from 'styled-jsx/css'; // eslint-disable-line

import { rhythm } from '../../../static/styles/styleConstants';

const styles = css`
  .link-container {
    display: flex;
    margin-bottom: ${rhythm.vt}px;
  }

  .link-text-container {
    flex: 1;
    margin-right: ${rhythm.hz / 2}px;
  }
`;

export default styles;
