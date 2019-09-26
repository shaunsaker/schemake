import css from 'styled-jsx/css';

import { colors, rhythm, sizes } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.secondary};
    padding: ${rhythm.vt * 2}px ${rhythm.hz}px;
  }

  .content-container {
    max-width: ${sizes.maxContentWidth}px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .link-container {
    margin-right: ${rhythm.hz}px;
  }

  .link {
    text-decoration: none;
  }
`;

export default styles;
