import { colors, rhythm } from '../../static/styles/styleConstants';

const styles = {
  container: {
    textTransform: 'initial',
    fontWeight: '700',
    height: 42,
  },

  spacer: {
    width: rhythm.hz / 2,
  },

  loadingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
};

export default styles;
