import css from 'styled-jsx/css'; // eslint-disable-line

import { animation, colors, rhythm, sizes } from '../../../static/styles/styleConstants';

const styles = css`
  .header-container {
    width: 100%;
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 0;
    margin: ${rhythm.vt * -1}px 0;
    padding: 0 ${rhythm.hz}px;
  }

  .actions-container {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .toggle-button-container {
    transition: transform ${animation.transition};
  }

  .details-container {
    padding: ${rhythm.vt}px ${rhythm.hz}px;
  }

  .add-button-container {
    margin-top: ${rhythm.vt}px;
  }

  .header-text-container {
    display: flex;
    align-items: flex-end;
  }

  .field-type-container {
    margin-left: ${rhythm.hz / 2}px;
  }

  @media (max-width: ${sizes.responsiveWidth}px) {
    .header-container {
      padding: 0 ${rhythm.hz / 2}px;
    }

    .details-container {
      padding: ${rhythm.vt}px ${rhythm.hz / 2}px;
    }

    .field-type-container {
      margin-left: ${rhythm.hz / 4}px;
    }
  }
`;

const inlineStyles = {
  expansionPanel: {
    width: '100%',
    marginTop: 0,
    boxShadow: 'none',
    border: `1px solid ${colors.lightGrey}`,
    borderRadius: sizes.borderRadius,
    padding: 0,
  },
  expansionPanelSummary: {
    cursor: 'default',
    padding: 0,
  },
  expansionPanelDetails: {
    flexDirection: 'column',
    padding: 0,
  },
};

export { inlineStyles };

export default styles;
