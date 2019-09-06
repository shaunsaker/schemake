import css from 'styled-jsx/css'; // eslint-disable-line

import { colors, rhythm, sizes } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    width: 100%;
    padding: ${rhythm.vt}px ${rhythm.hz}px;
    border: 1px dashed ${colors.grey};
    border-radius: ${sizes.borderRadius}px;
    background-color: white;
  }
  .primary-container {
    background-color: ${colors.lightSecondary};
    border: none;
  }

  .icon-container {
    margin-top: -2px; /* remove line height */
  }
`;

export default styles;
