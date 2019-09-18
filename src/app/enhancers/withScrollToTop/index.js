import React from 'react';

export default (ComposedComponent) => {
  class withScrollToTop extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    static propTypes = {};

    static defaultProps = {};

    componentDidMount() {
      window.scrollTo(0, 0);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return withScrollToTop;
};
