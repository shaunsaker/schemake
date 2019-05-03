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

      this.state = {};
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
      /*
       * If we had pendingTransactions and we don't and didn't have an error
       */
      const { hasPendingTransactions, hasError, isSyncing } = this.props;

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
      /*
       * Only sync data if authenticated
       */
      const { authenticated, isSyncing } = this.props;

      if (authenticated) {
        if (!isSyncing) {
          this.setIsSyncing(true);
        }

        this.syncData(args);
      }
    }

    setIsSyncing(isSyncing) {
      const { dispatch } = this.props;

      dispatch({
        type: 'SET_IS_SYNCING',
        payload: {
          isSyncing,
        },
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
    const { isSyncing } = appState;

    return { authenticated, hasPendingTransactions, hasError, isSyncing };
  }

  return connect(mapStateToProps)(withSyncData);
};
