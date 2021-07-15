import React, { useState } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import { BlogDetail } from '../BlogDetail';
import { BlogList } from '../BlogList';
import { DRAWER_WIDTH, POSTS_LIMIT, MOBILE_BREAKPOINT, APP_BAR_HEIGHT } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  selectedItem: {
    flex: 1,
  },
  list: {
    maxWidth: 400,
    background: 'black',
    color: 'white',
  },
  listItem: {
    justifyContent: 'space-between',
    cursor: 'pointer',
    display: 'block',
    borderBottom: '1px solid white'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  delete: {
    'textAlign': 'center',
    'padding': theme.spacing(1, 0),
    '&:hover': {
      opacity: 0.7,
    },
  },
  title: {
    flex: 1,
  },
  appBar: {
    background: 'black',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: APP_BAR_HEIGHT,
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function App() {
  const classes = useStyles();
  const selectedPost = useSelector(state => state.posts.selected);
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  const [open, setOpen] = useState(!isMobile);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={() => setOpen(true)} />
          </IconButton>
          <BlogList open={open} setOpen={setOpen} />
        </Toolbar>
      </AppBar>
      <div className={classes.selectedItem}>
        {selectedPost.id && (
          <BlogDetail post={selectedPost} open={open} setOpen={setOpen} />
        )}
      </div>
    </div>
  );
}
