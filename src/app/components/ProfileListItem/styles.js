import css from 'styled-jsx/css'; // eslint-disable-line

import { colors, rhythm, sizes } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: ${rhythm.vt}px ${rhythm.hz}px;
    border-radius: ${sizes.borderRadius}px;
  }

  .bg {
    background-color: ${colors.veryLightGrey};
  }

  .label-text-container {
    width: 160px;
    margin-right: ${rhythm.hz}px;
  }

  .value-text-container {
    flex: 1;

    /* TextLoading */
    position: relative;
    min-height: 21px;
  }

  @media (max-width: ${sizes.responsiveWidth}px) {
    .label-text-container {
      width: 120px;
    }
  }
`;

export default styles;
