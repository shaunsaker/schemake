import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import TextAvatar from '../TextAvatar';
import Typography from '../Typography';
import IconButton from '../IconButton';

const Note = ({ avatarText, username, dateText, noteText, handleMenuButtonClick }) => {
  return (
    <div className="container">
      <div className="user-container">
        <div className="user-avatar-container">
          <TextAvatar small>{avatarText}</TextAvatar>
        </div>

        <div className="user-text-container">
          <Typography type="small" bold gutterBottom>
            {username}
          </Typography>

          <Typography type="small">{dateText}</Typography>
        </div>

        <div className="menu-button-container">
          <IconButton iconName="menu" handleClick={handleMenuButtonClick} />
        </div>
      </div>

      <div className="note-text-container">
        <Typography type="paragraph">{noteText}</Typography>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

Note.propTypes = {
  avatarText: PropTypes.string,
  username: PropTypes.string,
  dateText: PropTypes.string,
  noteText: PropTypes.string,
  handleMenuButtonClick: PropTypes.func,
};
Note.defaultProps = {};

export default Note;
