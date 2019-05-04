import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class withSyncData extends React.Component {
    constructor(props) {
      super(props);

      this.onSyncData = this.onSyncData.bind(this);
      this.setIsSyncing = this.setIsSyncing.bind(this);
      this.syncData = this.syncData.bind(this);

      this.state = {
        isSyncing: false,
      };
    }

    static propTypes = {
      // connect
      dispatch: PropTypes.func,
      authenticated: PropTypes.bool,
      hasPendingTransactions: PropTypes.bool,
      hasError: PropTypes.bool,
      isSyncing: PropTypes.bool,
    };

    static defaultProps = {};

    componentDidUpdate(prevProps) {
      const { isSyncing } = this.state;

      /*
       * If we had pendingTransactions and we don't and didn't have an error
       */

      const { hasPendingTransactions, hasError } = this.props;

      /*
       * If we are loading and have no more pending transactions, toggle loading back to false
       */
      if (isSyncing && !hasPendingTransactions && prevProps.hasPendingTransactions) {
        this.setIsSyncing(false);
      }

      /*
       * If we are loading and had an error, toggle loading back to false
       */
      if (isSyncing && hasError && !prevProps.hasError) {
        this.setIsSyncing(false);
      }
    }

    onSyncData(args) {
      this.setIsSyncing(true);
      this.syncData(args);
    }

    setIsSyncing(isSyncing) {
      this.setState({
        isSyncing,
      });
    }

    syncData({ url, queries, nextActions }) {
      const { dispatch } = this.props;

      dispatch({
        type: 'sync',
        payload: {
          url,
          queries,
        },
        meta: {
          nextActions,
        },
      });
    }

    render() {
      const { isSyncing } = this.props;

      return <ComposedComponent isSyncing={isSyncing} syncData={this.onSyncData} {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    const { appState, user } = state;
    const { uid } = user;
    const authenticated = uid ? true : false;
    const hasPendingTransactions = appState.pendingTransactions.length ? true : false;
    const hasError = appState.systemMessage.variant === 'error' ? true : false;

    return { authenticated, hasPendingTransactions, hasError };
  }

  return connect(mapStateToProps)(withSyncData);
};
