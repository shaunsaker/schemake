import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';
import Panels from '../../../components/Panels';
import BlankState from '../../../components/BlankState';
import Typography from '../../../components/Typography';

const ViewProject = ({
  headerBarProps,
  projectName,
  types,
  items,
  isLoading,
  projectDoesNotExist,
}) => {
  let mainComponent;

  if (isLoading) {
    mainComponent = <BlankState />;
  } else if (projectDoesNotExist) {
    mainComponent = (
      <Fragment>
        <Typography type="title" gutterBottom>
          Whoops
        </Typography>

        <Typography type="paragraph" gutterBottom>
          We couldn&apos;t find this project. It was either deleted or it does not exist.
        </Typography>
      </Fragment>
    );
  } else {
    mainComponent = (
      <Fragment>
        <div className="text-container">
          <div className="title-container">
            <Typography type="title" gutterBottom>
              {projectName}
            </Typography>
          </div>
        </div>

        <Panels types={types} items={items} />

        <style jsx>{styles}</style>
      </Fragment>
    );
  }

  return (
    <Layout headerBarProps={headerBarProps}>
      <div className="container">{mainComponent}</div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

ViewProject.propTypes = {
  headerBarProps: PropTypes.shape({}),
  projectName: PropTypes.string,
  types: PropTypes.shape({}),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
  projectDoesNotExist: PropTypes.bool,
};

ViewProject.defaultProps = {};

export default ViewProject;
