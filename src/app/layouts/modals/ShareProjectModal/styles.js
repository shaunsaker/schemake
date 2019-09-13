import css from 'styled-jsx/css'; // eslint-disable-line

import { colors, rhythm, sizes } from '../../../static/styles/styleConstants';

const styles = css`
  .link-container {
    display: flex;
    margin-bottom: ${rhythm.vt}px;
    background-color: ${colors.veryLightGrey};
    border-radius: ${sizes.borderRadius}px;
    border: 1px solid ${colors.lightGrey};
    padding: ${rhythm.vt}px ${rhythm.hz}px;
  }

  .link-text-container {
    flex: 1;
    margin-right: ${rhythm.hz / 2}px;
  }
`;

export default styles;
