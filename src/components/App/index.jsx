import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CircularProgress,
  Link,
  List,
  ListItem,
  Typography,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { API_BASE_URL } from '../../actions/actionTypes';
import { fetchPosts, selectPost } from '../../actions';

const useStyles = makeStyles(() => ({
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
  },
}));
 
 export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.posts.loading);
  const posts = useSelector(state => state.posts.data);
  const selectedPost = useSelector(state => state.posts.selected);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (isLoading) return <CircularProgress />;

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {posts.map(post => (
          <ListItem
            key={post.data.id}
            className={classes.listItem}
            onClick={() => {
              dispatch(selectPost(post.data));
            }}>
            <div>
              <Typography component="p">{post.data.title}</Typography>
              <Typography variant="caption" component="p">
                Posted by {post.data.author}
              </Typography>
            </div>
            <div>
              <Avatar aria-label="recipe" variant="square" src={post.data.thumbnail}>
                T
              </Avatar>
            </div>
          </ListItem>
        ))}
      </List>
      <div className={classes.selectedItem}>
        {selectedPost.id && (
          <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {selectedPost.author.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={
                <Typography variant="body2" color="textSecondary" component="p">
                  Posted by {selectedPost.author}
                </Typography>
              }
            />
            <a href={selectedPost.thumbnail} target="_blank" rel="noopener noreferrer">
              <img src={selectedPost.thumbnail} alt={selectedPost.thumbnail} />
            </a>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {selectedPost.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                1 hours ago - {selectPost.num_comments} comments
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Link color="primary" target="_blank" href={`${API_BASE_URL}${selectedPost.permalink}`}>
                SEE ORIGINAL BLOG
              </Link>
            </CardActions>
          </Card>
        )}
      </div>
    </div>
  );
 }
