import React, { useState } from 'react';
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
  Tooltip
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
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
 

export const BlogDetail=(props)=>{
  const classes = useStyles();

  const selectedPost = props.selectedPost;
    return(
    <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {selectedPost.author.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={<div>
            <Typography variant="body2" color="textSecondary" component="p">
              Posted by {selectedPost.author}
            </Typography>
            </div>
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
      )
}