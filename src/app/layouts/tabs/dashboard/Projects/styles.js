import css from 'styled-jsx/css';

import { rhythm } from '../../../../static/styles/styleConstants';

const styles = css`
  .container {
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${rhythm.vt * 2}px;
  }

  .items-container {
  }

  .item-container {
    margin: 2px; /* allow box-shadow to come through */
  }
`;

export default styles;
