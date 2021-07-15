import React, { useState } from 'react';
import clsx from 'clsx';
import { formatDate } from '../../utils/formatDate';

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Link,
  Typography,
} from '@material-ui/core/';

import { makeStyles } from '@material-ui/core/styles';
import { API_BASE_URL } from '../../actions/actionTypes';
import { DRAWER_WIDTH, APP_BAR_HEIGHT } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  selectedItem: {
    flex: 1,
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: DRAWER_WIDTH,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  selectedItem: {
    flex: 1,
    marginTop: APP_BAR_HEIGHT,
  },
}));
 

export const BlogDetail=(props)=>{
  const classes = useStyles();
  const {post, open} = props;

  console.log(post,'postpostpostpost')
  if(!post.id){
    return(
    <Typography variant="h5" component="h2">
      No content
    </Typography>
    )
  }
    return(
      <div
      className={clsx(classes.selectedItem, classes.content, {
        [classes.contentShift]: !open,
      })}
      >
    <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {post.author.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={<div>
            <Typography variant="body2" color="textSecondary" component="p">
              Posted by {post.author}
            </Typography>
            </div>
          }
        />
        <a href={post.thumbnail} target="_blank" rel="noopener noreferrer">
          <img src={post.thumbnail} alt={post.thumbnail} />
        </a>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {formatDate(post.created_utc)} - {post.num_comments} comments
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Link color="primary" target="_blank" href={`${API_BASE_URL}${post.permalink}`}>
            Go to Reddit Blog
          </Link>
        </CardActions>
      </Card>
      </div>
      )
}