import css from 'styled-jsx/css'; // eslint-disable-line

import { animation, rhythm } from '../../static/styles/styleConstants';

const styles = css`
  .header-container {
    width: 100%;
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 0;
    margin: ${rhythm.vt * -1}px 0;
  }

  .actions-container {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .toggle-button-container {
    transition: transform ${animation.transition};
  }

  .content-container {
    transition: max-height ${animation.transition};
  }
`;

export default styles;
