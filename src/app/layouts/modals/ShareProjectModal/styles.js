import css from 'styled-jsx/css'; // eslint-disable-line

import { colors, rhythm, sizes } from '../../../static/styles/styleConstants';

const styles = css`
  .link-container {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: ${rhythm.vt}px;
    background-color: ${colors.veryLightGrey};
    border-radius: ${sizes.borderRadius}px;
    border: 1px solid ${colors.lightGrey};
    padding: ${rhythm.vt}px ${rhythm.hz}px;
  }

  .link-text-container {
    flex: 1;
  }

  .icon-buttons-container {
  }
  .icon-button-container {
  }

  @media (max-width: ${sizes.responsiveWidth}px) {
    .link-container {
      padding: ${rhythm.vt}px ${rhythm.hz / 2}px;
    }
  }
`;

export default styles;
