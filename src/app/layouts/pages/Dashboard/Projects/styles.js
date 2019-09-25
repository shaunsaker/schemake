import css from 'styled-jsx/css';

import { rhythm } from '../../../../static/styles/styleConstants';

const styles = css`
  .container {
    min-height: 100vh; /* so that we don't see a jump on load of tabs data */
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: ${rhythm.vt * 2}px;
  }
  .header-item-container {
    margin-top: ${rhythm.vt}px;
  }

  .items-container {
  }

  .item-container {
    margin: 2px; /* allow box-shadow to come through */
    margin-bottom: ${rhythm.vt}px;
  }

  .blank-state-container {
    margin-top: ${rhythm.vt}px;
  }
`;

export default styles;
