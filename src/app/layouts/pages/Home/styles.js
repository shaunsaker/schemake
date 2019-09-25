import css from 'styled-jsx/css';

import { colors, rhythm, sizes } from '../../../static/styles/styleConstants';

const styles = css`
  .container {
    height: 100vh;
    background-color: ${colors.secondary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -64px;
    padding: 0 ${rhythm.hz}px;
  }

  .content-container {
    max-width: ${sizes.maxContentWidth}px;
    width: 100%;
  }

  .left-container {
    max-width: 480px;
    width: 100%;
  }

  .title-text-container {
    margin-bottom: ${rhythm.vt}px;
  }

  .description-text-container {
  }

  .buttons-container {
    display: flex;
    align-items: center;
    margin-top: ${rhythm.vt}px;
  }
  .button-container {
    margin-right: ${rhythm.hz}px;
    margin-top: ${rhythm.vt}px;
  }

  @media (max-width: ${sizes.responsiveWidth}px) {
    .container {
      padding: 0 ${rhythm.hz / 2}px;
    }

    .buttons-container {
      flex-wrap: wrap;
    }
  }
`;

export default styles;
