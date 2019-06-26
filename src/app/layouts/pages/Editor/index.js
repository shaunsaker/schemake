import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Editor from './Editor';

export class EditorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    return <Editor />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(EditorContainer);
