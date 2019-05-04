import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/*
 * This enhancer controls how we create and edit documents
 * It also attaches meta data and passes back
 * isSaving, hasError and hasSuccess states
 */
export default (ComposedComponent) => {
  class withSaveDocument extends React.Component {
    constructor(props) {
      super(props);

      this.onSaveDocument = this.onSaveDocument.bind(this);
      this.setIsSaving = this.setIsSaving.bind(this);
      this.setHasError = this.setHasError.bind(this);
      this.setHasSuccess = this.setHasSuccess.bind(this);
      this.saveDocument = this.saveDocument.bind(this);

      this.state = {
        isSaving: false,
        hasError: false,
        hasSuccess: false,
      };
    }

    static propTypes = {
      /*
       * Store
       */
      dispatch: PropTypes.func,
      state: PropTypes.shape({}),
      uid: PropTypes.string,
      hasPendingTransactions: PropTypes.bool,
      hasStoreError: PropTypes.bool,
    };

    static defaultProps = {};

    componentDidUpdate(prevProps) {
      const { isSaving } = this.state;

      /*
       * If there is a store error while we are saving
       */
      const { hasStoreError } = this.props;

      if (isSaving && hasStoreError && !prevProps.hasStoreError) {
        this.setHasError(true);
        this.setIsSaving(false);
      }

      /*
       * If there are no more pending transactions while we are saving
       * and there is no internal error
       */
      const { hasError } = this.state;
      const { hasPendingTransactions } = this.props;

      if (isSaving && !hasPendingTransactions && prevProps.hasPendingTransactions && !hasError) {
        this.setHasSuccess(true);
        this.setIsSaving(false);
      }
    }

    onSaveDocument(args) {
      this.setIsSaving(true);
      this.setHasError(false);
      this.setHasSuccess(false);
      this.saveDocument(args);
    }

    setIsSaving(isSaving) {
      this.setState({
        isSaving,
      });
    }

    setHasError(hasError) {
      this.setState({
        hasError,
      });
    }

    setHasSuccess(hasSuccess) {
      this.setState({
        hasSuccess,
      });
    }

    saveDocument({ url, document, storeKey }) {
      const { dispatch, uid, state } = this.props;
      const dataInStore = storeKey && state[storeKey].data;
      let newDocument = {
        ...document,
        uid,
      };

      /*
       * If there is data in the store
       * attach dateModified
       * else attach dateCreated
       */
      if (dataInStore) {
        newDocument = {
          ...newDocument,
          dateModified: Date.now(),
        };
      } else {
        newDocument = {
          ...newDocument,
          dateCreated: Date.now(),
        };
      }

      dispatch({
        type: 'setDocument',
        payload: {
          url,
          document: newDocument,
        },
      });
    }

    render() {
      const { isSaving, hasError, hasSuccess } = this.state;

      return (
        <ComposedComponent
          isSaving={isSaving}
          hasError={hasError}
          hasSuccess={hasSuccess}
          saveDocument={this.onSaveDocument}
          {...this.props}
        />
      );
    }
  }

  function mapStateToProps(state) {
    const { appState, user } = state;
    const { uid } = user;
    const { pendingTransactions, systemMessage } = appState;
    const hasPendingTransactions = pendingTransactions.length ? true : false;
    const hasStoreError = systemMessage.variant === 'error' ? true : false;

    return { state, uid, hasPendingTransactions, hasStoreError };
  }

  return connect(mapStateToProps)(withSaveDocument);
};
