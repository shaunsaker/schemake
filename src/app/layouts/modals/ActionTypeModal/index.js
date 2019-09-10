import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firstCharToUpperCase } from 'js-simple-utils';

import ActionTypeModal from './ActionTypeModal';

import withSaveDocument from '../../../enhancers/withSaveDocument';

export class ActionTypeModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.saveType = this.saveType.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */

    /*
     * Parent
     */
    type: PropTypes.string,
    id: PropTypes.string,
    projectId: PropTypes.string,
    parentId: PropTypes.string,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,

    /*
     * withSaveDocument
     */
    saveDocument: PropTypes.func,
    isSaving: PropTypes.bool,
    hasSuccess: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    const { hasSuccess } = this.props;

    if (hasSuccess && !prevProps.hasSuccess) {
      this.closeModal();
    }
  }

  onSubmit(form) {
    this.saveType(form);
  }

  onClose() {
    this.closeModal();
  }

  saveType(form) {
    const { saveDocument, type, id, projectId, parentId } = this.props;
    const url = `projects/${projectId}/data/${id}`;
    const document = {
      ...form,
      type,
      parentId,
    };
    const nextActions = [];

    saveDocument({
      url,
      document,
      nextActions,
    });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { type, isOpen, isSaving } = this.props;
    const formattedType = firstCharToUpperCase(type);
    const isDisabled = isSaving;

    return (
      <ActionTypeModal
        type={formattedType}
        isOpen={isOpen}
        isDisabled={isDisabled}
        handleClose={this.onClose}
        handleSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { projects } = state;

  return {
    projects,
  };
};

/*
 * /1
 *
 * /1/2/4
//  */
// const project = {
//   data: {
//     1: {
//       type: 'collection',
//       name: 'users',
//       children: {
//         2: {
//           type: 'document',
//           name: 'uid',
//           children: {
//             3: {
//               type: 'string',
//               name: 'name',
//             },
//             4: {
//               type: 'string',
//               name: 'email',
//             },
//             5: {
//               type: 'collection',
//               name: 'friends',
//             },
//           },
//         },
//       },
//     },
//     6: {
//       type: 'collection',
//       name: 'posts',
//     },
//   },
// };

export default withSaveDocument(connect(mapStateToProps)(ActionTypeModalContainer));
