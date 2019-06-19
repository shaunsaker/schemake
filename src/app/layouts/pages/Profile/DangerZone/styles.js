import css from 'styled-jsx/css';

import { rhythm } from '../../../../static/styles/styleConstants';

const styles = css`
  .container {
    min-height: 100vh; /* so that we don't see a jump on load of tabs data */
  }

  .text-container {
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: ${rhythm.vt}px;
  }
`;

export default styles;
