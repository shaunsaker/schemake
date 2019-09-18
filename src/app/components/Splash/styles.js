import css from 'styled-jsx/css'; // eslint-disable-line

import { colors } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.secondary};
  }

  .logo {
    width: 160px;
  }
`;

export default styles;
