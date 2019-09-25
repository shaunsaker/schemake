import React from 'react';
import PropTypes from 'prop-types';

import { colors } from '../../../static/styles/styleConstants';
import styles from './styles';

import Modal from '../../../components/Modal';
import Typography from '../../../components/Typography';
import IconButton from '../../../components/IconButton';

const ShareProjectModal = ({
  name,
  url,
  isOpen,
  handleOpenInNewTab,
  handleCopyLink,
  handleClose,
}) => {
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

        <div className="icon-buttons-container">
          <div className="icon-button-container">
            <IconButton
              iconName="open-in-new"
              tooltip="Open in New Tab"
              handleClick={handleOpenInNewTab}
            />
          </div>

          <div className="icon-button-container">
            <IconButton iconName="copy" tooltip="Copy link" handleClick={handleCopyLink} />
          </div>
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
  handleOpenInNewTab: PropTypes.func,
  handleCopyLink: PropTypes.func,
  handleClose: PropTypes.func,
};
ShareProjectModal.defaultProps = {};

export default ShareProjectModal;
