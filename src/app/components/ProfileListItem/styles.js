import css from 'styled-jsx/css'; // eslint-disable-line

import { colors, rhythm, sizes } from '../../static/styles/styleConstants';

// FIXME: Could use work on mobile
const styles = css`
  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: ${rhythm.vt}px ${rhythm.hz}px;
    border-radius: ${sizes.borderRadius}px;
  }

  .bg {
    background-color: ${colors.lightGrey};
  }

  .label-text-container {
    width: 160px;
  }

  .value-text-container {
    flex: 1;

    /* TextLoading */
    position: relative;
    min-height: 21px;
  }
`;

export default styles;
