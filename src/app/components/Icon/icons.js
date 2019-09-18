import React from 'react';
import {
  AccountCircle,
  Add,
  ChevronLeft,
  FileCopy,
  Delete,
  ExpandMore,
  MoreVert,
  OpenInNew,
  Share,
  Sort,
} from '@material-ui/icons';

const icons = {
  'account-circle': (props) => <AccountCircle {...props} />,
  add: (props) => <Add {...props} />,
  'chevron-left': (props) => <ChevronLeft {...props} />,
  copy: (props) => <FileCopy {...props} />,
  delete: (props) => <Delete {...props} />,
  'expand-more': (props) => <ExpandMore {...props} />,
  menu: (props) => <MoreVert {...props} />,
  'open-in-new': (props) => <OpenInNew {...props} />,
  share: (props) => <Share {...props} />,
  sort: (props) => <Sort {...props} />,
};

export default icons;
