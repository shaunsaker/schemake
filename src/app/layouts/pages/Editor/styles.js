import css from 'styled-jsx/css';

import { colors, rhythm } from '../../../static/styles/styleConstants';

const styles = css`
  .container {
    min-height: 100vh;
  }

  .item-container {
    margin-bottom: ${rhythm.vt}px;
  }
`;

const getStyles = (type) => {
  const color = colors[type];

  return {
    border: `2px solid ${color}`,
  };
};

export { getStyles };

export default styles;
