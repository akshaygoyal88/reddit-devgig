import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Badge,
  CircularProgress,
  Drawer, IconButton,
  List,
  ListItem,
  Typography,
  Tooltip
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

import { ChevronLeft } from '@material-ui/icons';
import { formatDate } from '../../utils/formatDate';
import { DRAWER_WIDTH, POSTS_LIMIT } from '../../utils/constants';

import { fetchPosts, selectPost, dismiss, dismissAll } from '../../actions';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  selectedItem: {
    flex: 1,
  },
  list: {
    maxWidth: DRAWER_WIDTH,
    flex: 1,
    height: '100vh',
    overflow: 'auto',
    background: 'black',
    color: 'white',
    padding: 0,
    cursor: 'pointer',
  },
  listContainer: {
    position: 'relative',
  },
  dismissAllButton: {
    padding: theme.spacing(2),
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  listItem: {
    justifyContent: 'space-between',
    cursor: 'pointer',
    display: 'block',
    borderBottom: '1px solid white'
  },
  loading: {
    display: 'block',
    margin: '8px auto',
    color: 'white',
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  sectionTitle: {
    flex: 1,
    marginLeft: theme.spacing(1),
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
  num_comments: {
    padding: '15px 0px'
  },
  dismiss: {
    verticalAlign: 'text-bottom',
    lineHeight: 2
  },
  dismissPost: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inline: {
    display: 'inline-flex'
  }
}));

export const BlogList = (props) => {
  const setOpen = props.setOpen;
  const open = props.open;
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.posts.loading);
  const posts = useSelector(state => state.posts.data);
  const after = useSelector(state => state.posts.after);
  const [readBlogList, setReadBlogList] = useState([])

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const clickPost = (post) => {
    let blogs = readBlogList || [];
    if (!blogs.includes(post.data.id)) {
      blogs.push(post.data.id);
    }
    setReadBlogList(blogs);
    dispatch(selectPost(post.data));
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}>
      <div className={classes.drawerHeader}>
        <Typography variant="h6" noWrap className={classes.sectionTitle}>
          Reddit Posts
        </Typography>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeft />
        </IconButton>
      </div>
      <List
        className={classes.list}
        onScroll={e => {
          if (
            !isLoading &&
            posts.length < POSTS_LIMIT &&
            e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight
          ) {
            dispatch(fetchPosts({ after }));
          }
        }}
      >
        {posts.map(post => (
          <ListItem
            key={post.data.id}
            className={classes.listItem}
            onClick={(e) => clickPost(post)}>
            <div>
              <Typography variant="h6" component="span">
                <Badge
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  color="secondary" variant="dot" invisible={readBlogList.includes(post.data.id)}>
                  {post.data.author}
                </Badge>
              </Typography>
              <Typography variant="caption" component="span">
                &nbsp;{formatDate(post.data.created_utc)}
              </Typography>
            </div>
            <div className={classes.inline}>
              <Avatar aria-label="recipe" variant="square" className={classes.large} src={post.data.thumbnail}>
                A
                  </Avatar>
              <Typography inline="true" component="p">
                {post.data.title}
              </Typography>
            </div>
            <div className={classes.dismissPost}>
              <Tooltip title="Dismiss post" aria-label="dismiss-post" placement="top">
                <div className={classes.delete} onClick={() => dispatch(dismiss(post.data.id))}>
                  <HighlightOffOutlinedIcon /> <span className={classes.dismiss}>Dismiss post</span>
                </div>
              </Tooltip>
              <div className={classes.num_comments}>
                {post.data.num_comments} comments
                </div>
            </div>
          </ListItem>
        ))}
        {isLoading && <CircularProgress className={classes.loading} />}

      </List>
      <div className={classes.dismissAllButton} onClick={() => dispatch(dismissAll())}>
        Dismiss All
        </div>
    </Drawer>
  )
}