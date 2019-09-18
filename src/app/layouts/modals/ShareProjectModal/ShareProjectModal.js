import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { colors } from '../../../static/styles/styleConstants';
import styles from './styles';

import Modal from '../../../components/Modal';
import Typography from '../../../components/Typography';
import IconButton from '../../../components/IconButton';

const ShareProjectModal = ({ name, url, isOpen, handleCopyLink, handleClose }) => {
  const title = `Share ${name}`;
  const description = 'Anyone can view this project using this link.';

  return (
    <Modal title={title} description={description} isOpen={isOpen} handleClose={handleClose}>
      <div className="link-container">
        <div className="link-text-container">
          <Typography type="paragraph" bold color={colors.accent}>
            {url}
          </Typography>
        </div>

        <div className="copy-button-container">
          <IconButton iconName="copy" tooltip="Copy link" handleClick={handleCopyLink} />
        </div>
      </div>

      <style jsx>{styles}</style>
    </Modal>
  );
};

ShareProjectModal.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  isOpen: PropTypes.bool,
  handleCopyLink: PropTypes.func,
  handleClose: PropTypes.func,
};
ShareProjectModal.defaultProps = {};

export default memo(ShareProjectModal);
