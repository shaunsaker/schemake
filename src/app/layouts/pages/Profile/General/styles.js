import css from 'styled-jsx/css';

import { rhythm } from '../../../../static/styles/styleConstants';

const styles = css`
  .container {
    min-height: 100vh; /* so that we don't see a jump on load of tabs data */
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${rhythm.vt}px;
  }

  .items-container {
  }

  .item-container {
  }
`;

export default styles;
