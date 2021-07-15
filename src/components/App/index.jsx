import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import {BlogDetail} from '../BlogDetail';
import { BlogList } from '../BlogList';

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
}));
 
 export default function App() {
  const classes = useStyles();
  const selectedPost = useSelector(state => state.posts.selected);

  return (
    <div className={classes.root}>
      <BlogList />
      <div className={classes.selectedItem}>
        {selectedPost.id && (
          <BlogDetail selectedPost={selectedPost}/>
        )}
      </div>
    </div>
  );
 }
