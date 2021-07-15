import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CircularProgress,
  Link,
  List,
  ListItem,
  Typography,
  Tooltip
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { formatDate } from '../../utils/formatDate';

import { API_BASE_URL } from '../../actions/actionTypes';
import { fetchPosts, selectPost, dismiss } from '../../actions';


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

export const BlogList=(props)=>{
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const isLoading = useSelector(state => state.posts.loading);

  if (isLoading) return <CircularProgress />;
    return(
      <List className={classes.list}>
        {posts.map(post => (
          <ListItem
            key={post.data.id}
            className={classes.listItem}
            onClick={() => {
              dispatch(selectPost(post.data));
            }}>
              {/* <Typography>
                <Avatar aria-label="recipe" variant="square" src={post.data.thumbnail}>
                  T
                </Avatar>
              </Typography> */}
              <div>
                <Typography variant="h6" component="span">
                  <Badge color="secondary" variant="dot">
                    {post.data.author}
                  </Badge>
                </Typography>
                <Typography variant="caption" component="span">
                    &nbsp;{formatDate(post.data.created_utc)}
                </Typography>
              </div>
              <div style={{display: 'inline-flex'}}>
                  <Avatar aria-label="recipe" variant="square" className={classes.large} src={post.data.thumbnail}>
                    A
                  </Avatar>
                <Typography inline component="p">
                 {post.data.title}
                </Typography>
              </div>
              <div style={{display: 'flex', justifyContent:'space-between'}}>
                <Tooltip title="Dismiss post" aria-label="dismiss-post" placement="top">
                  <div className={classes.delete} onClick={() => dispatch(dismiss(post.data.id))}>
                    <HighlightOffOutlinedIcon /> <span>Dismiss post</span>
                  </div>
                </Tooltip>
                <div>
                  {post.data.num_comments} comments
                </div>
              </div>
              
          </ListItem>
        ))}
      </List>
    )
}