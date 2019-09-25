import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { routes } from '../../../config';

import Home from './Home';

export class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    const headerBarProps = {
      actions: [
        {
          id: 'example',
          text: 'Example',
          href: '', // TODO: Attach example URL
        },
      ],
      hideShadow: true,
    };

    return <Home headerBarProps={headerBarProps} />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(HomeContainer);
