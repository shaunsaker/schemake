import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

// TODO:
const NoteContainer = ({ username, date, noteText }) => {
  return (
    <div>
      <style jsx>{styles}</style>
    </div>
  );
};

NoteContainer.propTypes = {
  username: PropTypes.string,
  date: PropTypes.number,
  noteText: PropTypes.string,
};
NoteContainer.defaultProps = {};

export default NoteContainer;
