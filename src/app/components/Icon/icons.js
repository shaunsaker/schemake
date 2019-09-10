import React from 'react';
import {
  AccountCircle,
  Add,
  FileCopy,
  Delete,
  ExpandMore,
  MoreVert,
  Share,
  Sort,
} from '@material-ui/icons';

const icons = {
  'account-circle': (props) => <AccountCircle {...props} />,
  add: (props) => <Add {...props} />,
  copy: (props) => <FileCopy {...props} />,
  delete: (props) => <Delete {...props} />,
  'expand-more': (props) => <ExpandMore {...props} />,
  menu: (props) => <MoreVert {...props} />,
  share: (props) => <Share {...props} />,
  sort: (props) => <Sort {...props} />,
};

export default icons;
