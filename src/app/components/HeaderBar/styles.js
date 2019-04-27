import css from 'styled-jsx/css';

import { rhythm } from '../../static/styles/styleConstants';

const styles = css`
  .logo-image-container {
    flex: 1;
    display: flex;
    align-items: center;
    margin-right: ${rhythm.hz}px;
    padding: ${rhythm.vt / 2}px 0;
  }

  .logo-image {
    height: 48px;
    cursor: pointer;
  }

  .actions-wrapper {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .actions-container {
    display: flex;
  }
`;

export default styles;
