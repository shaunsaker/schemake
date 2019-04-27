import React from 'react';
import { AccountCircle, Add, MoreVert, Share, Sort } from '@material-ui/icons';

const icons = {
  'account-circle': (props) => <AccountCircle {...props} />,
  add: (props) => <Add {...props} />,
  menu: (props) => <MoreVert {...props} />,
  share: (props) => <Share {...props} />,
  sort: (props) => <Sort {...props} />,
};

export default icons;
