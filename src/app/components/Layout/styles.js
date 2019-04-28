import css from 'styled-jsx/css';

import { colors, rhythm, sizes } from '../../static/styles/styleConstants';

const styles = css`
  .container {
    position: relative;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 64px 0 0; /* Header height */
    background-color: ${colors.lightGrey};
  }

  .content-container {
    max-width: ${sizes.maxContentWidth}px;
    width: 100%;
    margin: 0 auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 ${rhythm.hz * 2}px;
    background-color: white;
    align-items: stretch;
  }

  .footer-container {
  }

  .send-feedback-button-container {
    position: fixed;
    bottom: ${rhythm.vt / 2}px;
    right: ${rhythm.vt / 2}px;
    z-index: 2;
  }

  .dev-info-container {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
  }
`;

export default styles;
