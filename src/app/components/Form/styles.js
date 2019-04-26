import css from 'styled-jsx/css';

import { colors, rhythm, sizes } from '../../static/styles/styleConstants';

const borderRadius = rhythm.vt / 4;

const styles = css`
  .container {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: ${sizes.maxContentWidth}px;
    margin: 0 auto;
    padding: ${rhythm.vt * 2}px ${rhythm.hz}px;
    background-color: ${colors.lightGrey};
    border-radius: ${borderRadius}px;
  }

  .center {
    align-items: center;
  }

  .input-container {
    margin-bottom: ${rhythm.vt}px;
    width: 100%;
    background-color: white;
    border-radius: ${borderRadius}px;
  }

  .footer-text-container {
    margin-bottom: ${rhythm.vt}px;
  }

  .buttons-container {
    display: flex;
  }

  .secondary-button-container {
    margin-left: ${rhythm.hz / 2}px;
  }
`;

export default styles;
