import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/*
 * This enhancer controls how we create and edit documents
 * It also attaches meta data
 */
export default (ComposedComponent) => {
  class withSaveDocument extends React.Component {
    constructor(props) {
      super(props);

      this.onSaveDocument = this.onSaveDocument.bind(this);
      this.saveDocument = this.saveDocument.bind(this);
      this.setIsSaving = this.setIsSaving.bind(this);

      this.state = {};
    }

    static propTypes = {
      // connect
      dispatch: PropTypes.func,
      state: PropTypes.shape({}),
      uid: PropTypes.string,
      hasPendingTransactions: PropTypes.bool,
      hasError: PropTypes.bool,
      isSaving: PropTypes.bool,
    };

    static defaultProps = {};

    componentDidUpdate(prevProps) {
      /*
       * If we had pendingTransactions and we don't and didn't have an error
       */
      const { hasPendingTransactions, hasError, isSaving } = this.props;

      /*
       * If we are saving and have no more pending transactions, toggle loading back to false
       */
      if (isSaving && !hasPendingTransactions && prevProps.hasPendingTransactions) {
        this.setIsSaving(false);
      }

      /*
       * If we are saving &&  had an error, toggle loading back to false
       */
      if (isSaving && hasError && !prevProps.hasError) {
        this.setIsSaving(false);
      }
    }

    onSaveDocument(args) {
      const { isSaving } = this.props;

      if (!isSaving) {
        this.setIsSaving(true);
      }

      this.saveDocument(args);
    }

    saveDocument({ url, document, storeKey }) {
      const { dispatch, uid, state } = this.props;
      const dataInStore = storeKey && state[storeKey].data;
      let newDocument;
      let actionType;

      /*
       * If data already exists
       * We should update the document
       * Else we should create a new document
       */
      if (dataInStore) {
        actionType = 'updateDocument';

        newDocument = {
          ...document,

          // Meta data
          uid,
          dateModified: Date.now(),
        };
      } else {
        actionType = 'setDocument';

        newDocument = {
          ...document,

          // Meta data
          uid,
          dateCreated: Date.now(),
        };
      }

      dispatch({
        type: actionType,
        payload: {
          url,
          document: newDocument,
        },
      });
    }

    setIsSaving(isSaving) {
      const { dispatch } = this.props;

      dispatch({
        type: 'SET_IS_SAVING',
        payload: {
          isSaving,
        },
      });
    }

    render() {
      const { isSaving } = this.props;

      return (
        <ComposedComponent isSaving={isSaving} saveDocument={this.onSaveDocument} {...this.props} />
      );
    }
  }

  function mapStateToProps(state) {
    const { appState, user } = state;
    const { uid } = user;
    const hasPendingTransactions = appState.pendingTransactions.length ? true : false;
    const hasError = appState.systemMessage.variant === 'error' ? true : false;
    const { isSaving } = appState;

    return { state, uid, hasPendingTransactions, hasError, isSaving };
  }

  return connect(mapStateToProps)(withSaveDocument);
};
