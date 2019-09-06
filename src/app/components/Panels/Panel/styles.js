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

  .addCollectionButtonContainer {
    margin-top: ${rhythm.vt}px;
  }

  .header-text-container {
    display: flex;
    align-items: flex-end;
  }
  .field-type-container {
    margin-left: ${rhythm.hz / 4}px;
  }
`;

const inlineStyles = {
  expansionPanel: {
    width: '100%',
    marginTop: 0,
    boxShadow: 'none',
    border: `1px solid ${colors.lightGrey}`,
    borderRadius: sizes.borderRadius,
  },
  expansionPanelSummary: {
    cursor: 'default',
  },
  expansionPanelDetails: {
    flexDirection: 'column',
  },
};

export { inlineStyles };

export default styles;
