import css from 'styled-jsx/css'; // eslint-disable-line

import { colors, rhythm, sizes } from '../../../static/styles/styleConstants';

const styles = css`
  .link-container {
    width: 100%;
    display: flex;
    margin-bottom: ${rhythm.vt}px;
    background-color: ${colors.veryLightGrey};
    border-radius: ${sizes.borderRadius}px;
    border: 1px solid ${colors.lightGrey};
    padding: ${rhythm.vt}px ${rhythm.hz}px;
  }

  .link-text-container {
    margin-right: ${rhythm.hz / 2}px;
  }

  .copy-button-container {
    flex: 1;
  }

  @media (max-width: ${sizes.responsiveWidth}px) {
    .link-container {
      padding: ${rhythm.vt}px ${rhythm.hz / 2}px;
    }
  }
`;

export default styles;
