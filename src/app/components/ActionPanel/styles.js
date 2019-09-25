import css from 'styled-jsx/css'; // eslint-disable-line

import { rhythm, sizes } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    display: flex;
    align-items: center;
  }

  .text-container {
    margin-right: ${rhythm.hz}px;
  }

  @media (max-width: ${sizes.responsiveWidth}px) {
    .text-container {
      margin-right: ${rhythm.hz / 2}px;
    }
  }
`;

export default styles;
